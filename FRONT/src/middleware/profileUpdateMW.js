import axios from 'axios';
import { SUBMIT_MODIFIED_PROFILE } from 'src/actions/profile';
import { saveUser, resetUser, USER_DELETE } from 'src/actions/user';

const profileUpdateMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  switch (action.type) {
    case SUBMIT_MODIFIED_PROFILE: {
      const token = localStorage.getItem('token');
      axios({
        method: 'patch',
        url: `${rootAPIUrl}/user`,
        headers: {
          // Je mets mon token dans le header "Authorization"
          Authorization: token,
        },
        data: action.payload,
      })
        .then((res) => {
          const actionSaveUser = saveUser(res.data);
          store.dispatch(actionSaveUser);
        })
        .catch((err) => console.log(err));
    }
      break;
    case USER_DELETE: {
      const token = localStorage.getItem('token');
      axios({
        method: 'delete',
        url: `${rootAPIUrl}/user`,
        headers: {
          // Je mets mon token dans le header "Authorization"
          Authorization: token,
        },
      })
        .then((res) => {
          localStorage.removeItem('token');
          const actionResetUser = resetUser();
          store.dispatch(actionResetUser);
        })
        .catch((err) => console.log(err));
    }
      break;
    default:
      next(action);
  }
};

export default profileUpdateMW;
