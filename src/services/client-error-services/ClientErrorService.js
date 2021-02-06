import ApiService from '../api-service/ApiService';
import { ERROR_URL } from '../../constants/UrlConstant';

const ClientErrorServices = {
  getClientError: () => ApiService.getData(ERROR_URL.CLIENT_ERROR_URL),
};
export default ClientErrorServices;
