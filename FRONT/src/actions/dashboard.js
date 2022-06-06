export const TOGGLE_SHARING_MODAL = 'TOGGLE_SHARING_MODAL';
export const GET_DASHBOARD_DATA = 'GET_DASHBOARD_DATA';
export const SAVE_DASHBOARD_DATA = 'SAVE_DASHBOARD_DATA';
export const DELETE_DASHBOARD_ITEM = 'DELETE_DASHBOARD_ITEM';
export const PSEUDO_NOT_EXIST = 'PSEUDO_NOT_EXIST';

export const toggleSharingModal = () => ({
  type: TOGGLE_SHARING_MODAL,
});

export const getDashboardData = (payload) => ({
  type: GET_DASHBOARD_DATA,
  payload,
});

export const saveDashboardData = (payload) => ({
  type: SAVE_DASHBOARD_DATA,
  payload,
});

export const deleteDashboardItem = (apiId, type) => ({
  type: DELETE_DASHBOARD_ITEM,
  payload: {
    apiId,
    type,
  },
});

export const pseudoNotExist = () => ({
  type: PSEUDO_NOT_EXIST,
});
