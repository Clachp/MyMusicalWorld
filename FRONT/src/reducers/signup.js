import { OPEN_SIGNUP_MODAL, CLOSE_SIGNUP_MODAL } from '../actions/signup';
import { CHANGE_INPUT } from '../actions';

const initialState = {
  modalOpened: false,
  lastname: '',
  firstname: '',
  mail: '',
  pseudo: '',
  password: '',
  passwordConfirm: '',
};

const signup = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_SIGNUP_MODAL:
      return {
        ...state,
        modalOpened: true,
      };
    case CLOSE_SIGNUP_MODAL:
      return {
        ...state,
        modalOpened: false,
      };
    case CHANGE_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    default:
      return state;
  }
};

export default signup;
