import ApiService from '../api-service/ApiService';
import { FOLLOW_UP_URL } from '../../constants/UrlConstant';

const FollowUpService = {
  getUpcomingActions: (page, limit, data) =>
    ApiService.putData(`${FOLLOW_UP_URL.FOLLOW_UP_FILTER_URL}?page=${page}&limit=${limit}`, data),
  getOpportunity: id => ApiService.getData(FOLLOW_UP_URL.GET_INDIVIDUAL_OPPORTUNITY_URL + id),
  getOpportunityWithPrevNext: data =>
    ApiService.putData(FOLLOW_UP_URL.GET_INDIVIDUAL_OPPORTUNITY_WITH_PREV_NEXT_URL, data),
  updateOpportunity: (id, data) =>
    ApiService.putData(FOLLOW_UP_URL.UPDATE_OPPORTUNITY_URL + id, data),
  deleteOpportunity: id => ApiService.deleteData(FOLLOW_UP_URL.DELETE_OPPORTUNITY_URL + id),
  syncWithLinkedIn: id =>
    ApiService.postData(FOLLOW_UP_URL.SYNC_OPPORTUNITY_WITH_LINKEDIN_URL + id),
  searchSubscriber: name => ApiService.putData(FOLLOW_UP_URL.SEARCH_SUBSCRIBERS, name),
  clearNotification: () => ApiService.putData(FOLLOW_UP_URL.CLEAR_NOTIFICATION),
  getNotification: () => ApiService.getData(FOLLOW_UP_URL.GET_NOTIFICATION),
};
export default FollowUpService;
