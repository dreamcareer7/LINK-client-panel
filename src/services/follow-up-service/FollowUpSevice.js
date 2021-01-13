import ApiService from '../api-service/ApiService';
import { FOLLOW_UP_URL } from '../../constants/UrlConstant';

const FollowUpService = {
  getUpcomingActions: (page, limit) =>
    ApiService.putData(`${FOLLOW_UP_URL.FOLLOW_UP_FILTER_URL}filters?page=${page}&limit=${limit}`),
};
export default FollowUpService;
