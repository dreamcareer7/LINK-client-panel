import ApiService from '../../api-service/ApiService';
import { HISTORY_URL } from '../../../constants/UrlConstant';

const HistoryService = {
  fetchConversation: (id, data) =>
    ApiService.putData(HISTORY_URL.FETCH_CONVERSATION_URL + id, data),
};
export default HistoryService;
