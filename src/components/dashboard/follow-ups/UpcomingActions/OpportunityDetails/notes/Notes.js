import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './notes.scss';
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
import Modal from '../../../../../commonComponents/Modal/Modal';

function Notes() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [newNote, setNewNote] = useState('');
  const [noteIdVal, setNoteIdVal] = useState('');
  const [isEditNote, setIsEditNote] = useState(false);
  const onChaneNoteText = e => {
    setNewNote(e.target.value);
  };
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [note, setNote] = useState('');
  useEffect(() => {
    dispatch(getNotes(id));
  }, []);
  const notes = useSelector(state => state.opportunityNotes);

  const onClickAddButton = () => {
    if (newNote.trim().length === 0) {
      errorNotification("You can't add an empty note");
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

  const onClosePopup = () => {
    setIsModelOpen(false);
  };
  const onDeleteData = () => {
    setIsModelOpen(false);
    dispatch(deleteNote(id, note));
  };

  const onClickDeleteNote = noteID => {
    setNote(noteID);
    setIsModelOpen(true);
  };
  return (
    <div className="notes-container">
      {isModelOpen && (
        <Modal
          description="Are you sure you want to delete this note?"
          title="Delete Opportunity"
          deleteData={onDeleteData}
          onClosePopup={onClosePopup}
        />
      )}
      <div className="note-list">
        <div className="common-subtitle">NOTES</div>
        {notes && notes.length ? (
          notes.map(noteData => (
            <div key={noteData._id} className="note-block mt-10">
              <span className="note note-container">{noteData.text}</span>
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
                {moment(noteData.creationTime).format('DD-MM-YYYY | hh:mm A')}
              </div>
            </div>
          ))
        ) : (
          <div className="notes-not-available">Notes not available</div>
        )}
      </div>

      <div className="add-new-note-container">
        <div className="common-subtitle">{isEditNote ? 'EDIT NOTE' : 'ADD NEW NOTE'}</div>
        <div className="note-block mt-10">
          <textarea
            className="note add-or-edit-note w-100"
            value={newNote}
            onChange={onChaneNoteText}
            placeholder="Add new note here.."
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'Add new note here..';
            }}
          />
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
