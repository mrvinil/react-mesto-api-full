import React from 'react';

function PopupWithForm({ name, children, isOpen, onClose, onSubmit }) {

  return (
    <div className={`popup popup-${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div className="popup__overlay"></div>
        <form name={name} className={`popup__form form-${name}`} onSubmit={onSubmit} noValidate>
          <button type="button" className="popup__close" onClick={onClose}></button>
          {children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
