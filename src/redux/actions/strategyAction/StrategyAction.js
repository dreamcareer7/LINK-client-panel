import { errorNotification } from '../../../constants/Toast';
import { STRATEGY_URL } from '../../../constants/UrlConstant';
import StrategyService from '../../../services/strategy-service/StrategyService';

// eslint-disable-next-line import/prefer-default-export
export const getStrategies = () => {
  return dispatch => {
    StrategyService.getStrategies()
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: STRATEGY_URL.GET_STRATEGY_URL,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
