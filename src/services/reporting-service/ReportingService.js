import ApiService from '../api-service/ApiService';
import { REPORTING_URL } from '../../constants/UrlConstant';

const ReportingService = {
  getActivityBreakdown: ({ startDate, endDate }) =>
    ApiService.getData(
      `${REPORTING_URL.GET_ACTIVITY_BREAKDOWN_URL}?startDate=${startDate}&endDate=${endDate}`
    ),
  getPipeline: ({ startDate, endDate }) =>
    ApiService.getData(
      `${REPORTING_URL.GET_PIPELINE_URL}?startDate=${startDate}&endDate=${endDate}`
    ),
  getConversation: ({ startDate, endDate }) =>
    ApiService.getData(
      `${REPORTING_URL.GET_CONVERSATION_URL}?startDate=${startDate}&endDate=${endDate}`
    ),
  getTotalSales: ({ startDate, endDate }) =>
    ApiService.getData(
      `${REPORTING_URL.GET_TOTAL_SALES_URL}?startDate=${startDate}&endDate=${endDate}`
    ),
};

export default ReportingService;
