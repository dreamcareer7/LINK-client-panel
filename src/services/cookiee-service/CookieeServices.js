import ApiService from '../api-service/ApiService';
import { COOKIEE_URL } from '../../constants/UrlConstant';

const CookieeServices = {
  checkingCookiee: () => ApiService.getData(COOKIEE_URL.CHECK_COOKIEE_URL),
};
export default CookieeServices;
