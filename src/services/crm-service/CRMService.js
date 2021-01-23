import ApiService from '../api-service/ApiService';
import { CRM_URL } from '../../constants/UrlConstant';

const CRMService = {
  getFilteredCRMs: (page, limit, data) =>
    ApiService.putData(`${CRM_URL.GET_FILTERED_CRM_URL}?page=${page}&limit=${limit}`, data),
  getCRMGraph: () => ApiService.putData(CRM_URL.GET_CRM_GRAPH_URL),
};

export default CRMService;
