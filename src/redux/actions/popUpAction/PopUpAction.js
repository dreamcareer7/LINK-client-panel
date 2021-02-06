import POPUP_REDUX_CONSTANT from '../../constants/popUpConstant/PopUpConstant';

// eslint-disable-next-line import/prefer-default-export
export const popUpData = message => {
  return dispatch => {
    dispatch({
      type: POPUP_REDUX_CONSTANT.POP_UP_MESSAGE,
      data: message,
    });
  };
};
