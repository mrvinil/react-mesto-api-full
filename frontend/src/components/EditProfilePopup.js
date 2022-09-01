import React, {useContext, useEffect, useState} from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(
  {
    isOpen,
    onClose,
    onUpdateUser,
    isLoading,
    onRenderLoading
  }) {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    onRenderLoading(true);
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="profile-editor"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}>
      <h2 className="popup__title">Редактировать профиль</h2>
      <div className="popup__inputs">
        <label className="popup__label">
          <input
            id="name-input"
            className="popup__input popup__input_text_name"
            type="text"
            name="name"
            value={name || ''}
            onChange={handleNameChange}
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required/>
          <span className="popup__input-error name-input-error"></span>
        </label>
        <label className="popup__label">
          <input
            id="job-input"
            className="popup__input popup__input_text_job"
            type="text"
            name="job"
            value={description || ''}
            onChange={handleDescriptionChange}
            placeholder="Род деятельности"
            minLength="2"
            maxLength="200"
            required/>
          <span className="popup__input-error job-input-error"></span>
        </label>
        <button type="submit" className="popup__btn">{isLoading ? 'Сохраняю...' : 'Сохранить'}</button>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
