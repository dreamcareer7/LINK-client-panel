import FOLLOW_UP_REDUX_CONSTANT from '../../constants/FollowUpReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const followUps = (state = null, action) => {
  switch (action.type) {
    case FOLLOW_UP_REDUX_CONSTANT.GET_FILTERED_FOLLOW_UPS:
      return action.data;
    default:
      return state;
  }
};
export const opportunityDetail = (state = null, action) => {
  switch (action.type) {
    case FOLLOW_UP_REDUX_CONSTANT.GET_OPPORTUNITY_DETAIL:
      return action.data;
    default:
      return state;
  }
};
