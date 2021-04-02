import { errorNotification } from '../../../../constants/Toast';
import NotesService from '../../../../services/follow-up-service/notesService/NotesService';
import NOTES_REDUX_CONSTANT from '../../../constants/notesReduxConstant/NotesReduxConstant';

// eslint-disable-next-line import/prefer-default-export
export const getNotes = id => {
  return dispatch => {
    NotesService.getNotes(id)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: NOTES_REDUX_CONSTANT.GET_OPPORTUNITY_NOTE,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};

export const addNewNote = (id, data) => {
  return dispatch => {
    NotesService.addNewNote(id, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: NOTES_REDUX_CONSTANT.ADD_OPPORTUNITY_NOTE,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
export const deleteNote = (id, noteId) => {
  return dispatch => {
    NotesService.deleteNote(id, noteId)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: NOTES_REDUX_CONSTANT.DELETE_OPPORTUNITY_NOTE,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
export const updateNote = (id, noteId, data) => {
  return dispatch => {
    NotesService.updateNote(id, noteId, data)
      .then(response => {
        if (response.data.status === 'SUCCESS') {
          dispatch({
            type: NOTES_REDUX_CONSTANT.UPDATE_OPPORTUNITY_NOTE,
            data: response.data.data,
          });
        }
      })
      .catch(e => {
        if (e.response.data.status === undefined) {
          errorNotification('It seems like server is down, Please try after sometime');
        } else if (e.response.data.status === 'INTERNAL_SERVER_ERROR') {
          errorNotification('Internal server error');
        }
      });
  };
};
