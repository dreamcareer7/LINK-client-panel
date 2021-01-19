import ApiService from '../../api-service/ApiService';
import { NOTES_URL } from '../../../constants/UrlConstant';

const NotesService = {
  getNotes: id => ApiService.getData(NOTES_URL.GET_NOTES_URL + id),
  addNewNote: (id, data) => ApiService.postData(NOTES_URL.ADD_NOTE_URL + id, data),
};
export default NotesService;
