import HISTORY_REDUX_CONSTANT from '../../../constants/historyReduxConstant/HistoryReduxConstant';

const initialDataFetch = {
  isLoading: true,
  data: null,
};
// eslint-disable-next-line import/prefer-default-export
export const opportunityHistory = (state = initialDataFetch, action) => {
  switch (action.type) {
    case HISTORY_REDUX_CONSTANT.LOADING_OPPORTUNITY_CONVERSATION:
      return {
        isLoading: true,
        data: state.data,
      };
    case HISTORY_REDUX_CONSTANT.FETCH_OPPORTUNITY_CONVERSATION:
      return {
        isLoading: false,
        data: action.data,
      };
    case HISTORY_REDUX_CONSTANT.APPEND_OPPORTUNITY_CONVERSATION:
      return {
        isLoading: false,
        data: [...action.data, ...state.data],
      };
    case HISTORY_REDUX_CONSTANT.ERROR_OPPORTUNITY_CONVERSATION:
      return {
        isLoading: false,
        data: null,
      };
    default:
      return state;
  }
};
