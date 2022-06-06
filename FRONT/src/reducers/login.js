import { OPEN_LOGIN_MODAL, CLOSE_LOGIN_MODAL } from '../actions/login';

const initialState = {
  modalOpened: false,
};

const login = (state = initialState, action = {}) => {
  switch (action.type) {
    case OPEN_LOGIN_MODAL:
      return {
        ...state,
        modalOpened: true,
      };
    case CLOSE_LOGIN_MODAL:
      return {
        ...state,
        modalOpened: false,
      };
    default:
      return state;
  }
};

export default login;
