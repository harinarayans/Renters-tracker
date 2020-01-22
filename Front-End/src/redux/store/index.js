import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import globalReducer from '../reducers/index';
import * as ActionTypes from '../actions/httpRequest';
import { reducer as formReducer } from 'redux-form';

const reducer = combineReducers({
  form: formReducer,
  globalReducer: globalReducer,
  login: ActionTypes.login.reducer,
  logout: ActionTypes.logout.reducer,
  authenticate: ActionTypes.authenticate.reducer,
  register: ActionTypes.register.reducer,
  verification: ActionTypes.verification.reducer,
  verificationLink: ActionTypes.verificationLink.reducer,
  resetPassword: ActionTypes.resetPassword.reducer,
  user: ActionTypes.user.reducer
});

export default function configureStore() {
  return (createStore(
    reducer,
    {},
    applyMiddleware(thunk)))
}

