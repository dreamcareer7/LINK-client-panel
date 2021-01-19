import ApiService from '../../api-service/ApiService';
import { NOTES_URL } from '../../../constants/UrlConstant';

const NotesService = {
  getNotes: id => ApiService.getData(NOTES_URL.GET_NOTES_URL + id),
  addNewNote: (id, data) => ApiService.postData(NOTES_URL.ADD_NOTE_URL + id, data),
  deleteNote: (id, noteId) => ApiService.deleteData(`${NOTES_URL.DELETE_NOTE_URL + id}/${noteId}`),
  updateNote: (id, noteId, data) =>
    ApiService.putData(`${NOTES_URL.UPDATE_NOTE_URL + id}/${noteId}`, data),
};
export default NotesService;
