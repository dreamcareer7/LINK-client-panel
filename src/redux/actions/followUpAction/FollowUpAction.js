import FollowUpService from '../../../services/follow-up-service/FollowUpSevice';
import { errorNotification, successNotification } from '../../../constants/Toast';
import FOLLOW_UP_REDUX_CONSTANT from '../../constants/FollowUpReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const getUpcomingActions = (page, data) => {
  return dispatch => {
    FollowUpService.getUpcomingActions(page, 9, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: FOLLOW_UP_REDUX_CONSTANT.GET_FILTERED_FOLLOW_UPS,
            data: response.data.data,
          });
          if (response.data.data.docs.docs.length === 0) {
            errorNotification('It seems data not available for this category');
          }
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
export const clearOpportunity = {
  type: FOLLOW_UP_REDUX_CONSTANT.CLEAR_OPPORTUNITY_DETAIL,
};
export const getOpportunity = id => {
  return dispatch => {
    dispatch(clearOpportunity);
    FollowUpService.getOpportunity(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: FOLLOW_UP_REDUX_CONSTANT.GET_OPPORTUNITY_DETAIL,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        console.log(e);
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
// In sync we have to store data on get opportunity constant
export const syncWithLinkedIn = id => {
  return dispatch => {
    dispatch(clearOpportunity);
    FollowUpService.syncWithLinkedIn(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: FOLLOW_UP_REDUX_CONSTANT.GET_OPPORTUNITY_DETAIL,
            data: response.data.data,
          });
          successNotification('Data synced with linked in');
        }
      })
      .catch(e => {
        console.log(e);
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const updateOpportunity = (id, data) => {
  return dispatch => {
    FollowUpService.updateOpportunity(id, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: FOLLOW_UP_REDUX_CONSTANT.UPDATE_OPPORTUNITY_DETAIL,
            data: response.data.data,
          });
          successNotification('Opportunity data updated successfully');
        }
      })
      .catch(e => {
        console.log(e);
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime.');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const deleteOpportunity = (id, cb) => {
  FollowUpService.deleteOpportunity(id)
    .then(response => {
      if (response.data.status === 'SUCCESS') {
        if (cb && typeof cb === 'function') {
          cb();
        }
        successNotification('Opportunity deleted successfully');
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
