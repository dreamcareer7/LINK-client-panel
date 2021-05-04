import HISTORY_REDUX_CONSTANT from '../../../constants/historyReduxConstant/HistoryReduxConstant';

const initialDataFetch = {
  isLoading: true,
  isAllDataLoaded: false,
  data: null,
  chatFor: 'linkedIn',
};
// eslint-disable-next-line import/prefer-default-export
export const opportunityHistory = (state = initialDataFetch, action) => {
  switch (action.type) {
    case HISTORY_REDUX_CONSTANT.LOADING_OPPORTUNITY_CONVERSATION:
      return {
        ...state,
        isLoading: true,
        data: state.data,
      };
    case HISTORY_REDUX_CONSTANT.FETCH_HISTORY_FROM_LINKEDIN_OR_SALES_NAV:
      return {
        ...state,
        chatFor: action.data,
      };
    case HISTORY_REDUX_CONSTANT.FETCH_OPPORTUNITY_CONVERSATION:
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case HISTORY_REDUX_CONSTANT.APPEND_OPPORTUNITY_CONVERSATION:
      return {
        ...state,
        isLoading: false,
        isAllDataLoaded: action.data.data.length === 0,
        data: { data: [...action.data.data, ...state.data.data] },
      };
    case HISTORY_REDUX_CONSTANT.ERROR_OPPORTUNITY_CONVERSATION:
      return {
        ...state,
        isLoading: false,
        data: null,
      };
    default:
      return state;
  }
};
