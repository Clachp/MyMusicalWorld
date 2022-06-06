/* eslint-disable no-lone-blocks */
import axios from 'axios';
import { SUBMIT_LOGIN, loginFailure, openLoginModal } from 'src/actions/login';
import { SUBMIT_SIGNUP, signupFailure, openSignUpModal } from 'src/actions/signup';
import {
  saveUser, USER_LOGOUT, USER_CHECK, setActionLogged,
} from 'src/actions/user';

const authenticationMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case USER_CHECK:
      const token = localStorage.getItem('token');
      if (token) {
        axios({
          method: 'get',
          url: `${rootAPIUrl}/user`,
          headers: {
            // Je mets mon token dans le header "Authorization"
            Authorization: token,
          },
        })
          .then((res) => {
            const userSaveAction = saveUser(res.data);
            store.dispatch(userSaveAction);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      break;
    case SUBMIT_LOGIN: {
      // double destructuration
      // const { login: { mail, password } } = store.getState();

      axios.post(`${rootAPIUrl}/login`, {
        ...action.payload,
      })
        .then((res) => {
          localStorage.setItem('token', res.headers.authorization);
          const actionSaveUser = saveUser(res.data);
          store.dispatch(actionSaveUser);
          const actionLogged = setActionLogged(res.data);
          store.dispatch(actionLogged);
        })
        .catch((err) => {
          const action = loginFailure(err.response.data);
          const openModal = openLoginModal();
          store.dispatch(action);
          store.dispatch(openModal);
        });
    }
      break;
    case SUBMIT_SIGNUP: {
      // const {
      //   signup: {
      //     mail, pseudo, firstname, lastname, password, passwordConfirm,
      //   },
      // } = store.getState();

      axios.post(`${rootAPIUrl}/signup`, {
        lastname: action.payload.lastname,
        firstname: action.payload.firstname,
        mail: action.payload.mail,
        pseudo: action.payload.pseudo,
        password: action.payload.password,
        password_confirmation: action.payload.passwordConfirm,
      })
        .then((res) => {
          localStorage.setItem('token', res.headers.authorization);
          const actionSaveUser = saveUser(res.data);
          store.dispatch(actionSaveUser);
          const actionLogged = setActionLogged(res.data);
          store.dispatch(actionLogged);
        })
        .catch((err) => {
          const action = signupFailure(err.response.data);
          const openModal = openSignUpModal();
          store.dispatch(action);
          store.dispatch(openModal);
        });
    }
      break;
    case USER_LOGOUT: {
      next(action);
      localStorage.removeItem('token');
    }
      break;
    default:
      next(action);
  }
};

export default authenticationMW;
