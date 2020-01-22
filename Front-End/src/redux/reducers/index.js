import { actionType } from '../actions';

const INITIAL_STATE = {
  snackbar: {
    open: false,
    message: 'Snackbar component',
    variant: 'info'
  }
};

let globalReducer = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case actionType.SET_CURRENT_USER:
      state = Object.assign({}, state, {
        currentUser: action.value
      });
      break;
    case actionType.SET_TOAST:
      state = Object.assign({}, state, {
        snackbar: action.value
      });
      break;
    case actionType.SET_LINEAR_PROGRESS_BAR:
      state = Object.assign({}, state, {
        showLinearProgressBar: action.value
      });
      break;
    default:
      break;
  }
  return state;
}
export default globalReducer
