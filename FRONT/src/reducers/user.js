import {
  SAVE_USER, USER_LOGOUT, USER_RESET, SET_ACTION_LOGGED, UNSET_ACTION_LOGGED,
} from 'src/actions/user';

const initialState = {
  isLogged: false,
  actionLogged: false,
  actionUnLogged: false,
  mail: '',
  lastname: '',
  firstname: '',
  pseudo: '',
  id: null,
};

const user = (state = initialState, action = {}) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        ...action.payload,
        isLogged: true,
        actionUnLogged: false,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
        actionUnLogged: true,
      };
    case USER_RESET:
      return {
        ...initialState,
        actionUnLogged: true,
      };
    case SET_ACTION_LOGGED:
      return {
        ...state,
        actionLogged: true,
      };
    case UNSET_ACTION_LOGGED:
      return {
        ...state,
        actionLogged: false,
      };
    default:
      return state;
  }
};

export default user;
