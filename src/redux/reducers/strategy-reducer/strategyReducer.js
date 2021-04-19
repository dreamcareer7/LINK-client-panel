import { STRATEGY_URL } from '../../../constants/UrlConstant';

// eslint-disable-next-line import/prefer-default-export
export const strategy = (state = [], action) => {
  switch (action.type) {
    case STRATEGY_URL.GET_STRATEGY_URL:
      return action.data;
    default:
      return state;
  }
};
