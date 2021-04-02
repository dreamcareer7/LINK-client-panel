import { errorNotification } from '../../../constants/Toast';
import CRMService from '../../../services/crm-service/CRMService';
import CRM_REDUX_CONSTANT from '../../constants/crmReduxConstants/CRMReduxConstant';

export const getFilteredCRMSAction = (page, data) => {
  return dispatch => {
    CRMService.getFilteredCRMs(page, 9, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: CRM_REDUX_CONSTANT.GET_FILTERED_CRMS,
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

export const getCRMGraphData = () => {
  return dispatch => {
    CRMService.getCRMGraph()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: CRM_REDUX_CONSTANT.GET_CRMS_GRAPH_DATA,
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
