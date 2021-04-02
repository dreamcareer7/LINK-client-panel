import { errorNotification } from '../../../constants/Toast';
import COOKIEE_REDUX_CONSTANT from '../../constants/cookiee/CokkieeConstant';
import CookieeServices from '../../../services/cookiee-service/CookieeServices';
import POPUP_REDUX_CONSTANT from '../../constants/popUpConstant/PopUpConstant';

// eslint-disable-next-line import/prefer-default-export
export const checkingCookiee = () => {
  return dispatch => {
    CookieeServices.checkingCookiee()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: COOKIEE_REDUX_CONSTANT.GET_COOKIEE,
            data: response.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        }
        if (e.response.data.status === 'ERROR') {
          errorNotification('Internal server error');
        }
        if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        } else if (e.response.data.status === 'READ_ERROR_MESSAGE') {
          dispatch({
            type: POPUP_REDUX_CONSTANT.POP_UP_MESSAGE,
            data: e.response.data.message,
          });
        }
      });
  };
};
