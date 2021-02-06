import POPUP_REDUX_CONSTANT from '../../constants/popUpConstant/PopUpConstant';

// eslint-disable-next-line import/prefer-default-export
export const popUpReducer = (state = null, action) => {
  switch (action.type) {
    case POPUP_REDUX_CONSTANT.POP_UP_MESSAGE:
      return action.data;

    default:
      return state;
  }
};
