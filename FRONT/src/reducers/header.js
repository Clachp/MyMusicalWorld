import { TOGGLE_MOBILE_MENU, TOGGLE_PROFILE_MODAL } from 'src/actions/header';
import { SAVE_USER, USER_LOGOUT } from 'src/actions/user';

const initialState = {
  mobileMenuOpened: false,
  profileModalOpened: false,
};

const header = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_MOBILE_MENU:
      return {
        ...state,
        mobileMenuOpened: !state.mobileMenuOpened,
      };
    case SAVE_USER:
      return {
        ...state,
        mobileMenuOpened: false,
      };
    case USER_LOGOUT:
      return {
        ...state,
        mobileMenuOpened: false,
      };
    case TOGGLE_PROFILE_MODAL:
      return {
        ...state,
        profileModalOpened: !state.profileModalOpened,
      };
    default:
      return state;
  }
};

export default header;
