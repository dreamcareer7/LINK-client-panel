import COOKIEE_REDUX_CONSTANT from '../../constants/cookiee/CokkieeConstant';

// eslint-disable-next-line import/prefer-default-export
export const cookieeReducer = (state = null, action) => {
  switch (action.type) {
    case COOKIEE_REDUX_CONSTANT.GET_COOKIEE:
      return action.data;
    default:
      return state;
  }
};
