import ApiService from '../api-service/ApiService';
import { STRATEGY_URL } from '../../constants/UrlConstant';

const StrategyService = {
  getStrategies: () => ApiService.getData(STRATEGY_URL.GET_STRATEGY_URL),
};
export default StrategyService;
