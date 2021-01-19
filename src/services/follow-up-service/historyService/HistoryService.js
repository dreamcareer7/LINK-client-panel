import ApiService from '../../api-service/ApiService';
import { HISTORY_URL } from '../../../constants/UrlConstant';

const HistoryService = {
  fetchConversation: id => ApiService.putData(HISTORY_URL.FETCH_CONVERSATION_URL + id),
};
export default HistoryService;
