import { errorNotification } from '../../../constants/Toast';
import CRMService from '../../../services/crm-service/CRMService';
import CRM_REDUX_CONSTANT from '../../constants/crmReduxConstants/CRMReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const getFilteredCRMSAction = (page, data) => {
  return dispatch => {
    CRMService.getFilteredCRMs(page, 9, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: CRM_REDUX_CONSTANT.GET_FILTERED_CRMS,
            data: response.data.data,
          });
          if (response.data.data.docs.docs.length === 0) {
            errorNotification('It seems data not available for this category');
          }
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
