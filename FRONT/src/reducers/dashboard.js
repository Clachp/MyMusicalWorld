import {
  TOGGLE_SHARING_MODAL, SAVE_DASHBOARD_DATA, DELETE_DASHBOARD_ITEM, PSEUDO_NOT_EXIST, GET_DASHBOARD_DATA
} from 'src/actions/dashboard';
import { SUBMIT_ADD_MUSIC } from 'src/actions/addMusic';
import { USER_LOGOUT } from 'src/actions/user';

const initialState = {
  pseudo: '',
  artists: [],
  albums: [],
  tracks: [],
  sharingModalOpened: false,
  dashboardChanged: false,
  pseudoNotExist: false,
  loading: false,
};

const dashboard = (state = initialState, action = {}) => {
  switch (action.type) {
    case TOGGLE_SHARING_MODAL:
      return {
        ...state,
        sharingModalOpened: !state.sharingModalOpened,
      };
    case SAVE_DASHBOARD_DATA:
      return {
        ...state,
        ...action.payload,
        dashboardChanged: false,
        loading: false,
      };
    case SUBMIT_ADD_MUSIC:
      return {
        ...state,
        dashboardChanged: true,
      };
    case DELETE_DASHBOARD_ITEM:
      return {
        ...state,
        dashboardChanged: true,
      };
    case USER_LOGOUT:
      return {
        ...initialState,
      };
    case PSEUDO_NOT_EXIST:
      return {
        ...state,
        pseudoNotExist: true,
      };
    case GET_DASHBOARD_DATA:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default dashboard;
