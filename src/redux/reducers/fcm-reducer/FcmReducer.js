import FCM_REDUX_CONSTANT from '../../constants/fcmConstant/FcmConstant';

// eslint-disable-next-line import/prefer-default-export
export const fcmReducer = (state = null, action) => {
  switch (action.type) {
    case FCM_REDUX_CONSTANT.FCM_DATA:
      return action.data;
    default:
      return state;
  }
};
