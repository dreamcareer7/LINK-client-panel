import { STRATEGY_URL } from '../../../constants/UrlConstant';

// eslint-disable-next-line import/prefer-default-export
const initialState = {
  strategyData: [],
  isLoading: true,
};

// eslint-disable-next-line import/prefer-default-export
export const strategy = (state = initialState, action) => {
  switch (action.type) {
    case STRATEGY_URL.GET_STRATEGY_URL:
      return {
        isLoading: false,
        strategyData: action.data,
      };
    default:
      return state;
  }
};
