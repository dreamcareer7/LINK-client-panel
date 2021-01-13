import FollowUpService from '../../../services/follow-up-service/FollowUpSevice';
import { errorNotification } from '../../../constants/Toast';
import FOLLOW_UP_REDUX_CONSTANT from '../../constants/FollowUpReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const getUpcomingActions = data => {
  return dispatch => {
    FollowUpService.getUpcomingActions(1, 1000, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: FOLLOW_UP_REDUX_CONSTANT.GET_FILTERED_FOLLOW_UPS,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
