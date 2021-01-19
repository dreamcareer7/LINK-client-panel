import { errorNotification } from '../../../../constants/Toast';
import HISTORY_REDUX_CONSTANT from '../../../constants/historyReduxConstant/HistoryReduxConstant';
// eslint-disable-next-line import/no-named-as-default
import HistoryService from '../../../../services/follow-up-service/historyService/HistoryService';

// eslint-disable-next-line import/prefer-default-export
export const fetchConversation = id => {
  return dispatch => {
    HistoryService.fetchConversation(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: HISTORY_REDUX_CONSTANT.FETCH_OPPORTUNITY_CONVERSATION,
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
