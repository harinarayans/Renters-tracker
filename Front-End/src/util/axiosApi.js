import axios from 'axios';
import { setToast } from '../redux/actions/index';
import util from '../util/util';

const ACTION_STATUSES = ['START', 'SUCCESS', 'ERROR'];

var defaultHandlers = {

    START: function (state, action, options) {
        return Object.assign({}, state, { isFetching: true, error: null });
    },

    SUCCESS: function (state, action, options) {
        if (action.options.start && !action.isFetching) {
            var allItems = [];

            allItems = action.options.start > 0 && state.data && action.options.isList ? state.data.records : [];
            action.json.records = allItems.concat(action.json.records);
            action.isFetching = true;
        }
        return Object.assign({}, state, { data: action.json, isFetching: false, type: action.type, error: null });
    },

    ERROR: function (state, action, options) {
        const { response } = action;
        let errorMessage = response;
        if (typeof response === 'object') {
            if (response.isTimedOut) {
                errorMessage = "Request timed out";
            } else if (response.isCanceled) {
                errorMessage = "Request canceled";
            } else if (response.message === "Failed to fetch") {
                errorMessage = "Please check your internet connection";
            }
        }
        return Object.assign({}, state, { isFetching: false, error: errorMessage });
    }
};

export default class AjaxRequest {
    constructor(options) {
        Object.assign(this, options);
        let requestType = options.requestType;
        let actionTypes = {};
        let actions = {};
        let statuses = [].concat(ACTION_STATUSES);
        if (options.otherActionTypes) {
            statuses = statuses.concat(options.otherActionTypes)
        }
        for (const status of statuses) {
            var action = requestType + '_' + status
            actionTypes[requestType + '_' + status] = action;
            actions[status] = action;
        }
        this.actionTypes = actionTypes;
        this.actions = actions;
        this.reducer = this.createReducer(options);
    }

    createReducer(options) {
        var requestType = options.requestType;

        var actions = options.actions || ACTION_STATUSES;

        var validActions = [];

        actions.forEach((action) => {
            var actionName = requestType + '_' + action;
            validActions.push(actionName);
        });

        for (var o in options.otherHandlers) {
            validActions.push(requestType + '_' + o);
        }

        let parser = this.createDefaultParser(options, actions);

        return function (state = { isFetching: false, data: null }, action) {
            if (validActions.indexOf(action.type) > -1) {
                return Object.assign({}, state, parser(state, action));
            }
            return state;
        }
    }

    createDefaultParser(options, actions) {

        let customHandlers = Object.assign({}, defaultHandlers, options.handlers, options.otherHandlers);

        let handlerMap = {};

        for (var action in customHandlers) {
            var key = options.requestType + '_' + action;
            handlerMap[key] = customHandlers[action];
        };

        return function (state = { isFetching: false, data: {} }, action) {
            if (typeof handlerMap[action.type] === 'function') {
                return handlerMap[action.type](state, action, options);
            } else {
                return state;
            }
        }
    }

    onStart(options) {
        return {
            type: this.actions.START,
            options
        }
    }

    onSuccess(options, json) {
        return {
            type: this.actions.SUCCESS,
            options,
            json,
            receivedAt: Date.now()
        }
    }

    onFailure(options, response) {
        return {
            type: this.actions.ERROR,
            options,
            response,
            receivedAt: Date.now()
        }
    }

    dispose() {
        return (dispatch) => {
            return dispatch(this.onDispose({}, {}));
        }
    }

    onDispose(options, json) {
        return {
            type: this.actions.SUCCESS,
            options,
            json,
            receivedAt: Date.now()
        }
    }

    request(options, id, type, callbackFun) {
        return (dispatch) => {
            return dispatch(this.axiosRequest(options, id, type, callbackFun))
        }
    }

    createFormData(props) {
        var formData = new FormData();
        for (var key in props) {
            if (typeof props[key] === "string" || props[key] instanceof Date) {
                formData.append(key, props[key]);
            }
            else if (typeof props[key] === "object") {
                if (props[key] && props[key].lastModifiedDate) {
                    formData.append(key, props[key]);
                } else {
                    formData.append(key, JSON.stringify(props[key]));
                }
            } else {
                formData.append(key, JSON.stringify(props[key]));
            }
        }
        return formData;
    }

    axiosRequest(options, id, type, callbackFun) {
        let me = this;
        return dispatch => {
            dispatch(me.onStart(options))
            axios({
                url: this.url,
                method: type ? type : 'POST',
                data: this.createFormData(options),
                timeout: options.timeout || 30000,
                withCredentials: options.ignoreCredential ? false : true
            }).then(response => {
                if (response.status === 200) {
                    dispatch(me.onSuccess(options, response));
                    callbackFun && callbackFun(response);
                } 
            }).catch(error => {
                let message = null;
                if (error === "Request failed with status code 401") {
                    message = "Unauthenticated.";
                } else if (error === "Request failed with status code 403") {
                    message = "Unauthorized.";
                } else if (error === "Request failed with status code 500") {
                    message = "Failed to fetch.";
                } else if (error.message === "Network Error") {
                    message = "Please check you internet connection";
                } else {
                    message = "Something goes wrong.";
                }
                dispatch(me.onFailure(options, message));
                let response = {};
                response.data = { success: false, data: null, message: message ? message : error.message }
                callbackFun && callbackFun(response);
                dispatch(setToast({ open: true, message: message, variant: util.toastVariant.error }))
            });
        }
    }
}