import ApiService from '../api-service/ApiService';
import { ACCOUNTS_URL } from '../../constants/UrlConstant';

const AccountService = {
  updateClient: data => ApiService.postData(ACCOUNTS_URL.UPDATE_CLIENT, data),
  getClientInfo: () => ApiService.getData(ACCOUNTS_URL.GET_CLIENT_INFO),
  getIndustry: () => ApiService.getData(ACCOUNTS_URL.GET_INDUSTRY),
  getCompany: () => ApiService.getData(ACCOUNTS_URL.GET_COMPANY_SIZE),
};
export default AccountService;