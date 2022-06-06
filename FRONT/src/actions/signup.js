export const OPEN_SIGNUP_MODAL = 'OPEN_SIGNUP_MODAL';
export const CLOSE_SIGNUP_MODAL = 'CLOSE_SIGNUP_MODAL';
export const SUBMIT_SIGNUP = 'SUBMIT_SIGNUP';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const openSignUpModal = () => ({
  type: OPEN_SIGNUP_MODAL,
});

export const closeSignUpModal = () => ({
  type: CLOSE_SIGNUP_MODAL,
});

export const submitSignUp = (payload) => ({
  type: SUBMIT_SIGNUP,
  payload,
});

export const signupFailure = (payload) => ({
  type: SIGNUP_FAILURE,
  payload,
});
