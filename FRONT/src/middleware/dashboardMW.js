import axios from 'axios';
import {
  GET_DASHBOARD_DATA, saveDashboardData, DELETE_DASHBOARD_ITEM, pseudoNotExist,
} from 'src/actions/dashboard';

const dashboardMW = (store) => (next) => (action) => {
  const rootAPIUrl = process.env.ROOT_API_URL;
  const token = localStorage.getItem('token');
  switch (action.type) {
    case GET_DASHBOARD_DATA:
      if (!action.payload) {
        axios({
          method: 'get',
          url: `${rootAPIUrl}/dashboard/`,
          headers: {
            Authorization: token,
          },
        })
          .then((res) => {
            const actionDashboardSave = saveDashboardData(res.data);
            store.dispatch(actionDashboardSave);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      else {
        axios({
          method: 'get',
          url: `${rootAPIUrl}/dashboard/${action.payload}`,
        })
          .then((res) => {
            const actionDashboardSave = saveDashboardData(res.data);
            store.dispatch(actionDashboardSave);
          })
          .catch((err) => {
            const actionPseudoNotExist = pseudoNotExist();
            store.dispatch(actionPseudoNotExist);
            console.log(err);
          });
      }
      next(action);
      break;

    case DELETE_DASHBOARD_ITEM:
      axios({
        method: 'delete',
        url: `${rootAPIUrl}/dashboard/${action.payload.type}`,
        headers: {
          Authorization: token,
        },
        data: {
          apiId: action.payload.apiId,
        },
      })
        .catch((err) => {
          console.log(err);
        });
      next(action);
      break;

    default:
      next(action);
      break;
  }
};

export default dashboardMW;
