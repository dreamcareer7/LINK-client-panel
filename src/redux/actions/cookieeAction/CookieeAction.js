import { errorNotification } from '../../../constants/Toast';
import COOKIEE_REDUX_CONSTANT from '../../constants/cookiee/CokkieeConstant';
import CookieeServices from '../../../services/cookiee-service/CookieeServices';

// eslint-disable-next-line import/prefer-default-export
export const checkingCookiee = () => {
  return dispatch => {
    CookieeServices.checkingCookiee()
      .then(response => {
        console.log('cookiee response->', response);
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: COOKIEE_REDUX_CONSTANT.GET_COOKIEE,
            data: response.data,
          });
        }
      })
      .catch(e => {
        console.log(e);
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
