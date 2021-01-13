import FOLLOW_UP_REDUX_CONSTANT from '../../constants/FollowUpReduxConstant';

export const followUps = (state = [], action) => {
  switch (action.type) {
    case FOLLOW_UP_REDUX_CONSTANT.GET_FILTERED_FOLLOW_UPS:
      return action.data;
    default:
      return state;
  }
};
