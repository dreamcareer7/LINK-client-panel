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
          errorNotification('It seems like server is down, Please try after sometime.');
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
