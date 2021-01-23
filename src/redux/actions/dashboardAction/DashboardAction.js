import { errorNotification } from '../../../constants/Toast';
import DASHBOARD_REDUX_CONSTANT from '../../constants/dashboardReduxConstant/DashboardReduxConstant';
// eslint-disable-next-line import/no-named-as-default
import DashboardService from '../../../services/dashboard-services/DashboardServices';

// eslint-disable-next-line import/prefer-default-export
export const fetchOpportunity = () => {
  return dispatch => {
    DashboardService.getOpportunity()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANT.OPPRTUNITIES_REDUX_CONSTANT,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const fetchPipeLine = () => {
  return dispatch => {
    DashboardService.getPipeline()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANT.PIPELINE_REDUX_CONSTANT,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const fetchClientQuote = () => {
  return dispatch => {
    DashboardService.getDailyQuote()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANT.CLIENT_QUOTE,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
