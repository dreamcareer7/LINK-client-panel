import React from 'react';
// import PropTypes from 'prop-types';
import edit from '../../../../../../assets/images/edit.svg';
import close from '../../../../../../assets/images/cancel.svg';

function Notes({ opprotunityNotes }) {
  console.log('notes=>', opprotunityNotes);
  return (
    <div className="notes-container">
      <div className="note-list">
        <div className="common-subtitle">NOTES</div>
        <div className="note-block mt-10">
          <span className="note">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </span>
          <div className="note-action">
            <img alt="edit" src={edit} title="Edit Note" />
            <img className="close-circle" src={close} />
          </div>
          <div className="note-time-stamp">25-01-2021 | 2:35 AM</div>
        </div>
        <div className="note-block mt-10">
          <span className="note">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </span>
          <div className="note-action">
            <img alt="edit" src={edit} title="Edit Note" />
            <img className="close-circle" src={close} />
          </div>
          <div className="note-time-stamp">25-01-2021 | 2:35 AM</div>
        </div>
      </div>
      <div className="add-new-note-container">
        <div className="common-subtitle">ADD NEW NOTE</div>
        <div className="note-block mt-10">
          <span className="note">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
        <button type="button" className="button success-button">
          ADD
        </button>
      </div>
    </div>
  );
}
Notes.propTypes = {};
export default Notes;
