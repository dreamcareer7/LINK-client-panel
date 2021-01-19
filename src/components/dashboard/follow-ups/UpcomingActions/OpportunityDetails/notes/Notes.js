import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import edit from '../../../../../../assets/images/edit.svg';
import close from '../../../../../../assets/images/cancel.svg';
import {
  addNewNote,
  getNotes,
} from '../../../../../../redux/actions/followUpAction/notesAction/NotesAction';

function Notes() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    dispatch(getNotes(id));
  }, []);
  const notes = useSelector(state => state.opportunityNotes);
  const deleteNote = () => {};
  const addNote = () => {
    const data = {
      note: newNote,
    };
    dispatch(addNewNote(id, data));
  };
  return (
    <div className="notes-container">
      <div className="note-list">
        <div className="common-subtitle">NOTES</div>
        {notes.map(noteData => (
          <div key={noteData._id} className="note-block mt-10">
            <span className="note">{noteData.text}</span>
            <div className="note-action">
              <img alt="edit" src={edit} title="Edit Note" />
              <img className="close-circle" src={close} onClick={deleteNote} />
            </div>
            <div className="note-time-stamp">
              {moment(noteData.creationTime).format('MM/DD/YY | hh:mm:ss')}
            </div>
          </div>
        ))}
      </div>

      <div className="add-new-note-container">
        <div className="common-subtitle">ADD NEW NOTE</div>
        <div className="note-block mt-10">
          <input className="note" value={newNote} onChange={e => setNewNote(e.target.value)} />
        </div>
        <button type="button" className="button success-button" onClick={addNote}>
          ADD
        </button>
      </div>
    </div>
  );
}
export default Notes;
