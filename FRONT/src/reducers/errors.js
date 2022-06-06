import { SIGNUP_FAILURE, CLOSE_SIGNUP_MODAL } from 'src/actions/signup';
import { LOGIN_FAILURE, CLOSE_LOGIN_MODAL } from 'src/actions/login';

const initialState = {
  error: '',
};

const error = (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGNUP_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case CLOSE_SIGNUP_MODAL:
      return {
        ...initialState,
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default error;
