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
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const getDashboardData = () => {
  return dispatch => {
    DashboardService.getDashboardData()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANT.DASHBOARD_DATA,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e && e?.response) {
          if (e.response.data.status === undefined) {
            errorNotification('It seems like server is down, Please try after sometime');
          } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
            errorNotification('Internal server error');
          }
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
            data: response.data,
          });
        }
      })
      .catch(e => {
        if (e && e?.response) {
          if (e.response.data.status === undefined) {
            errorNotification('It seems like server is down, Please try after sometime');
          } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
            errorNotification('Internal server error');
          }
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
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

// export const getTotalSalesGraphData = () => {
//   return dispatch => {
//     DashboardService.getTotalSales()
//       .then(response => {
//         if (response.data.status === 'SUCCESS') {
//           dispatch({
//             type: DASHBOARD_REDUX_CONSTANT.TOTAL_SALES_REDUX_CONSTANT,
//             data: response.data,
//           });
//         }
//       })
//       .catch(e => {
//         if (e.response.data.status === undefined) {
//           errorNotification('It seems like server is down, Please try after sometime');
//         } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
//           errorNotification('Internal server error');
//         }
//       });
//   };
// };

export const changeStartDateValue = value => {
  return dispatch => {
    dispatch({
      type: DASHBOARD_REDUX_CONSTANT.UPDATE_START_DATE_VALUE,
      value,
    });
  };
};

export const changeEndDateValue = value => {
  return dispatch => {
    dispatch({
      type: DASHBOARD_REDUX_CONSTANT.UPDATE_END_DATE_VALUE,
      value,
    });
  };
};

export const totalSalesDateFilter = data => {
  return dispatch => {
    DashboardService.getTotalSales(data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANT.TOTAL_SALES_REDUX_CONSTANT,
            data: response.data,
          });
        }
      })
      .catch(e => {
        if (e && e?.response) {
          if (e.response.data.status === undefined) {
            errorNotification('It seems like server is down, Please try after sometime');
          } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
            errorNotification('Internal server error');
          }
        }
      });
  };
};

export const resetFilterData = data => {
  console.log(data);
  return dispatch => {
    DashboardService.getTotalSales(data)
      .then(response => {
        console.log(response);
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: DASHBOARD_REDUX_CONSTANT.TOTAL_SALES_REDUX_CONSTANT,
            data: response.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const resetDashboardGraphData = dispatch => {
  dispatch({
    type: DASHBOARD_REDUX_CONSTANT.RESET_PIPELINE_GRAPH_DATA,
  });
  dispatch({
    type: DASHBOARD_REDUX_CONSTANT.RESET_TOTAL_SALES_GRAPH_DATA,
  });
};
