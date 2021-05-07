import { errorNotification } from '../../../../constants/Toast';
import HISTORY_REDUX_CONSTANT from '../../../constants/historyReduxConstant/HistoryReduxConstant';
// eslint-disable-next-line import/no-named-as-default
import HistoryService from '../../../../services/follow-up-service/historyService/HistoryService';
import POPUP_REDUX_CONSTANT from '../../../constants/popUpConstant/PopUpConstant';

// eslint-disable-next-line import/prefer-default-export
export const fetchConversation = (id, data, params ={}) => {
  return dispatch => {
    dispatch({
      type: HISTORY_REDUX_CONSTANT.LOADING_OPPORTUNITY_CONVERSATION,
    });
    HistoryService.fetchConversation(id, data, params)
      .then(response => {
        if (response?.data?.status === 'SUCCESS') {
          if (data) {
            dispatch({
              type: HISTORY_REDUX_CONSTANT.APPEND_OPPORTUNITY_CONVERSATION,
              data: response.data,
            });
          } else {
            dispatch({
              type: HISTORY_REDUX_CONSTANT.FETCH_OPPORTUNITY_CONVERSATION,
              data: response.data,
            });
          }
        }
      })
      .catch(e => {
        if (e.response?.data?.status === 'READ_ERROR_MESSAGE') {
          dispatch({
            type: POPUP_REDUX_CONSTANT.POP_UP_MESSAGE,
            data: e.response.data.message,
          });
        } else if (e?.response?.data?.status === undefined) {
          dispatch({
            type: HISTORY_REDUX_CONSTANT.ERROR_OPPORTUNITY_CONVERSATION,
          });
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e?.response?.data?.status === 'INTERNAL_SERVER_ERROR') {
          dispatch({
            type: HISTORY_REDUX_CONSTANT.ERROR_OPPORTUNITY_CONVERSATION,
          });
          errorNotification('Internal server error');
        }
      });
  };
};

export const clearConversation = () => {
  return dispatch => {
    dispatch({
      type: HISTORY_REDUX_CONSTANT.FETCH_OPPORTUNITY_CONVERSATION,
      data: null,
    });
  };
};

export const getChatHistoryFromSalesNavOrLinkedIn = (data) => {
  return dispatch => {
    dispatch({
      type: HISTORY_REDUX_CONSTANT.FETCH_HISTORY_FROM_LINKEDIN_OR_SALES_NAV,
      data,
    });
  };
};
