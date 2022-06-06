export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export const SUBMIT_LOGIN = 'SUBMIT_LOGIN';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const openLoginModal = () => ({
  type: OPEN_LOGIN_MODAL,
});

export const closeLoginModal = () => ({
  type: CLOSE_LOGIN_MODAL,
});

export const submitLogin = (payload) => ({
  type: SUBMIT_LOGIN,
  payload,
});

export const loginFailure = (payload) => ({
  type: LOGIN_FAILURE,
  payload,
});
