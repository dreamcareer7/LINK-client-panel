import ApiService from '../api-service/ApiService';
import { DASHBOARD_URL } from '../../constants/UrlConstant';

const DashboardService = {
  getOpportunity: () => ApiService.putData(DASHBOARD_URL.OPPORTUNITY_URL),
  getDashboardData: () => ApiService.putData(DASHBOARD_URL.DASHBOARD_GENERAL),
  getPipeline: () => ApiService.putData(DASHBOARD_URL.PIPELINE_VALUE),
  getDailyQuote: () => ApiService.getData(DASHBOARD_URL.CLIENT_QUOTE),
  getTotalSales: data => ApiService.putData(`${DASHBOARD_URL.GET_TOTAL_SALES}`, data),
};
export default DashboardService;
