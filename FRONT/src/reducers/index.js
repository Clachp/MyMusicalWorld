import { combineReducers } from 'redux';

import login from './login';
import signup from './signup';
import user from './user';
import header from './header';
import addMusic from './addMusic';
import dashboard from './dashboard';
import errors from './errors';

export default combineReducers({
  login,
  signup,
  user,
  header,
  addMusic,
  dashboard,
  errors,
});
