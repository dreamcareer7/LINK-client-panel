import ApiService from '../api-service/ApiService';
import { ACCOUNTS_URL } from '../../constants/UrlConstant';

const AccountService = {
  updateClient: data => ApiService.putData(ACCOUNTS_URL.UPDATE_CLIENT, data),
  getClientInfo: () => ApiService.getData(ACCOUNTS_URL.GET_CLIENT_INFO),
  getIndustry: () => ApiService.getData(ACCOUNTS_URL.GET_INDUSTRY),
  getCompany: () => ApiService.getData(ACCOUNTS_URL.GET_COMPANY_SIZE),
  creatFCMToken: data => ApiService.putData(ACCOUNTS_URL.CREATE_FCM_TOKEN, data),
  logoutUser: data => ApiService.postData(ACCOUNTS_URL.LOGOUT_USER, data),
  downloadInvoice: () => ApiService.getData(ACCOUNTS_URL.DOWNLOAD_INVOICE),
  getInvoices: ({ page, limit = 5, startDate, endDate }) =>
    ApiService.getData(
      `${ACCOUNTS_URL.GET_INVOICES_URL}?page=${page}&limit=${limit}${
        startDate ? `&startDate=${startDate}` : ''
      }${endDate ? `&endDate=${endDate}` : ''}`
    ),
};
export default AccountService;
