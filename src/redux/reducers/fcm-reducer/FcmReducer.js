import FCM_REDUX_CONSTANT from '../../constants/fcmConstant/FcmConstant';

// eslint-disable-next-line import/prefer-default-export
export const fcmReducer = (state = [], action) => {
  switch (action.type) {
    case FCM_REDUX_CONSTANT.ADD_ALL_NOTIFICATION:
      return action.data;

    case FCM_REDUX_CONSTANT.ADD_NEW_NOTIFICATION:
      return [...state, action.data];

    case FCM_REDUX_CONSTANT.CLEAR_ALL_NOTIFICATION:
      return [];

    default:
      return state;
  }
};
