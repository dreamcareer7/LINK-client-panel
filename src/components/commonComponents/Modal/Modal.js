import React from 'react';
import './Modal.scss';
import { useOnClickOutside } from '../../../helpers/UseClickOutsideHook';

// eslint-disable-next-line react/prop-types
const Modal = ({ title, description, deleteData = () => {}, onClosePopup = () => {} }) => {
  const popupRef = React.useRef();
  useOnClickOutside(popupRef, onClosePopup);
  const onDeleteClick = () => {
    deleteData();
  };
  const onCloseButtonPress = () => {
    onClosePopup();
  };

  return (
    <div className="modal-main-container">
      <div id="pop-up" ref={popupRef} className="modal-container">
        <div className="modal-main-title">{title}</div>
        <div className="modal-description">{description}</div>
        <div className="buttons-row">
          <button type="button" className="button white-button" onClick={onCloseButtonPress}>
            Close
          </button>
          <button type="button" className="button danger-button" onClick={onDeleteClick}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
