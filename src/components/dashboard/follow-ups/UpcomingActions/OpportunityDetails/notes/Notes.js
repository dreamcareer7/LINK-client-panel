import React, { useEffect, useState } from 'react';
import moment from 'moment';
import './notes.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import edit from '../../../../../../assets/images/edit.svg';
import save from '../../../../../../assets/images/save.svg';
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
  const [editNoteIndex, setEditNoteIndex] = useState('');
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

  const onclickSaveButton = index => {
    const updatedNoteData = document.getElementById(`updateNote-${index}`);
    console.log(updatedNoteData.value);
    if (updatedNoteData.value.trim().length === 0) {
      errorNotification("You can't add an empty note");
    } else {
      const data = {
        note: updatedNoteData.value,
      };
      dispatch(updateNote(id, noteIdVal, data));
      setEditNoteIndex(-1);
    }
  };

  const onClickUpdateNote = (data, indx) => {
    setEditNoteIndex(indx);
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
          notes
            .sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime())
            .map((noteData, index) => (
              <div key={noteData._id} className="note-block edit-note-block mt-10">
                {editNoteIndex === index ? (
                  <textarea
                    rows={6}
                    className="note note-container edit-note-space"
                    id={`updateNote-${index}`}
                  >
                    {noteData.text}
                  </textarea>
                ) : (
                  <span className="note note-container edit-note-space" id={`updateNote-${index}`}>
                    {noteData.text}
                  </span>
                )}
                <div className="note-action">
                  {editNoteIndex === index ? (
                    <img
                      alt="Save"
                      src={save}
                      title="Save Note"
                      onClick={() => onclickSaveButton(index)}
                    />
                  ) : (
                    <img
                      alt="edit"
                      src={edit}
                      title="Edit Note"
                      onClick={() => onClickUpdateNote(noteData, index)}
                    />
                  )}
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
        <div className="common-subtitle">ADD NEW NOTE</div>
        <div className="note-block mt-10">
          <textarea
            className="note add-note w-100"
            value={newNote}
            onChange={onChaneNoteText}
            placeholder="Enter your note here..."
            onFocus={e => {
              e.target.placeholder = '';
            }}
            onBlur={e => {
              e.target.placeholder = 'Enter your note here...';
            }}
          />
        </div>
        <button type="button" className="button success-button" onClick={onClickAddButton}>
          ADD
        </button>
      </div>
    </div>
  );
}
export default Notes;
