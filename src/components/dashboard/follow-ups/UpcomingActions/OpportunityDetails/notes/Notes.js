import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import edit from '../../../../../../assets/images/edit.svg';
import close from '../../../../../../assets/images/cancel.svg';
import {
  addNewNote,
  deleteNote,
  getNotes,
  updateNote,
} from '../../../../../../redux/actions/followUpAction/notesAction/NotesAction';
import { errorNotification } from '../../../../../../constants/Toast';

function Notes() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [newNote, setNewNote] = useState('');
  const [noteIdVal, setNoteIdVal] = useState('');
  const [isEditNote, setIsEditNote] = useState(false);
  const onChaneNoteText = e => {
    setNewNote(e.target.value);
  };

  useEffect(() => {
    dispatch(getNotes(id));
  }, []);
  const notes = useSelector(state => state.opportunityNotes);

  const onClickAddButton = () => {
    if (newNote.trim().length === 0) {
      errorNotification('You can not add empty note');
    } else {
      const data = {
        note: newNote,
      };
      dispatch(addNewNote(id, data));
    }
    setNewNote('');
  };
  const onclickEditButton = () => {
    const data = {
      note: newNote,
    };
    dispatch(updateNote(id, noteIdVal, data));
    setNewNote('');
    setIsEditNote(false);
  };

  const onClickUpdateNote = data => {
    setIsEditNote(true);
    setNewNote(data.text);
    setNoteIdVal(data._id);
  };

  const onClickDeleteNote = noteId => {
    dispatch(deleteNote(id, noteId));
  };
  return (
    <div className="notes-container">
      <div className="note-list">
        <div className="common-subtitle">NOTES</div>
        {notes && notes.length ? (
          notes.map(noteData => (
            <div key={noteData._id} className="note-block mt-10">
              <span className="note">{noteData.text}</span>
              <div className="note-action">
                <img
                  alt="edit"
                  src={edit}
                  title="Edit Note"
                  onClick={() => onClickUpdateNote(noteData)}
                />
                <img
                  className="close-circle"
                  src={close}
                  title="Delete Note"
                  onClick={() => onClickDeleteNote(noteData._id)}
                />
              </div>
              <div className="note-time-stamp">
                {moment(noteData.creationTime).format('MM/DD/YY | hh:mm:ss')}
              </div>
            </div>
          ))
        ) : (
          <div>Notes not available</div>
        )}
      </div>

      <div className="add-new-note-container">
        <div className="common-subtitle">{isEditNote ? 'EDIT NOTE' : 'ADD NEW NOTE'}</div>
        <div className="note-block mt-10">
          <input className="note" value={newNote} onChange={onChaneNoteText} />
        </div>
        <button
          type="button"
          className="button success-button"
          onClick={isEditNote ? onclickEditButton : onClickAddButton}
        >
          {isEditNote ? 'EDIT' : 'ADD'}
        </button>
      </div>
    </div>
  );
}
export default Notes;
