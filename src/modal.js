import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './modal.css'; // יצירת עיצוב מותאם אישית למודאל

const Modal = ({ isOpen, onCloseModel, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onCloseModel}>X</button>
        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
