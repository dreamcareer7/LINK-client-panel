import HISTORY_REDUX_CONSTANT from '../../../constants/historyReduxConstant/HistoryReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const opportunityHistory = (state = null, action) => {
  switch (action.type) {
    case HISTORY_REDUX_CONSTANT.FETCH_OPPORTUNITY_CONVERSATION:
      return action.data;
    default:
      return state;
  }
};
