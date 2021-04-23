import { errorNotification } from '../../../constants/Toast';
import ReportingService from '../../../services/reporting-service/ReportingService';
import REPORT_REDUX_CONSTANT from '../../constants/reportReduxConstants/ReportReduxConstant';

export const getActivityBreakdownGraphData = ({ startDate, endDate }) => {
  return dispatch => {
    ReportingService.getActivityBreakdown({ startDate, endDate })
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: REPORT_REDUX_CONSTANT.GET_ACTIVITY_BREAKDOWN_GRAPH_DATA,
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

export const getPipelineValuesGraphData = ({ startDate, endDate }) => {
  return dispatch => {
    ReportingService.getPipeline({ startDate, endDate })
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: REPORT_REDUX_CONSTANT.GET_PIPELINE_VALUES_GRAPH_DATA,
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

export const getConversationGraphData = ({ startDate, endDate }) => {
  return dispatch => {
    ReportingService.getConversation({ startDate, endDate })
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: REPORT_REDUX_CONSTANT.GET_CONVERSATION_GRAPH_DATA,
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

export const getTotalSalesGraphData = ({ startDate, endDate }) => {
  return dispatch => {
    ReportingService.getTotalSales({ startDate, endDate })
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          dispatch({
            type: REPORT_REDUX_CONSTANT.GET_TOTAL_SALES_GRAPH_DATA,
            data: response.data,
          });
        }
      })
      .catch(e => {
        if (e.response?.data?.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const resetReportingGraphData = dispatch => {
  dispatch({
    type: REPORT_REDUX_CONSTANT.RESET_CONVERSATION_GRAPH_DATA,
  });
  dispatch({
    type: REPORT_REDUX_CONSTANT.RESET_TOTAL_SALES_GRAPH_DATA,
  });
};
