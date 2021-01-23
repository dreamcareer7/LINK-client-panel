import ApiService from '../api-service/ApiService';
import { DASHBOARD_URL } from '../../constants/UrlConstant';

const DashboardService = {
  getOpportunity: () => ApiService.putData(DASHBOARD_URL.OPPORTUNITY_URL),
  getPipeline: () => ApiService.putData(DASHBOARD_URL.PIPELINE_VALUE),
  getDailyQuote: () => ApiService.getData(DASHBOARD_URL.CLIENT_QUOTE),
};
export default DashboardService;
