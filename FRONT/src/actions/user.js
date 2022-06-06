export const SAVE_USER = 'SAVE_USER';
export const USER_LOGOUT = 'USER_LOGOUT';
export const USER_CHECK = 'USER_CHECK';
export const USER_DELETE = 'USER_DELETE';
export const USER_RESET = 'USER_RESET';
export const SET_ACTION_LOGGED = 'SET_ACTION_LOGGED';
export const UNSET_ACTION_LOGGED = 'UNSET_ACTION_LOGGED';

export const saveUser = (user) => ({
  type: SAVE_USER,
  payload: {
    ...user,
  },
});

export const checkUser = () => ({
  type: USER_CHECK,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
});

export const deleteUser = () => ({
  type: USER_DELETE,
});

export const resetUser = () => ({
  type: USER_RESET,
});

export const setActionLogged = () => ({
  type: SET_ACTION_LOGGED,
});

export const unsetActionLogged = () => ({
  type: UNSET_ACTION_LOGGED,
});
