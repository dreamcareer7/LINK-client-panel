import { errorNotification } from '../../../constants/Toast';
import ClientErrorServices from '../../../services/client-error-services/ClientErrorService';
import CLIENT_ERROR_REDUX_CONSTANT from '../../constants/clientErrorConstant/ClientErrorConstant';

// eslint-disable-next-line import/prefer-default-export
export const getClientError = () => {
  return dispatch => {
    ClientErrorServices.getClientError()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: CLIENT_ERROR_REDUX_CONSTANT.GET_CLIENT_ERROR,
            data: response.data,
          });
        }
      })
      .catch(e => {
        console.log(e);
        if (e && e.response && e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response?.data?.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
