import FCM_REDUX_CONSTANT from '../../constants/fcmConstant/FcmConstant';
import { firebaseMessagingInstance } from '../../../firebaseInit';

// eslint-disable-next-line import/prefer-default-export
export const addFCMListner = () => {
  console.log('fcmlistener');
  return dispatch => {
    firebaseMessagingInstance.onMessage(payload => {
      console.log('payload->', payload);
      dispatch({
        type: FCM_REDUX_CONSTANT.ADD_NEW_NOTIFICATION,
        data: payload,
      });
    });
  };
};
