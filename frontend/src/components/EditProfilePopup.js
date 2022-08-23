import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description,
    });
  }


  return (
    <PopupWithForm
      popupID="popup__profile"
      formID="popup__form_profile"
      title="Редактировать профиль"
      name="profileForm"
      buttonValue="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <label className="popup__field">
          <input
            type="text"
            name="userName"
            id="username-input"
            className="popup__input popup__input_type_name"
            placeholder="Имя"
            minLength="2"
            maxLength="40"
            required
            value={name || ''}
            onChange={handleNameChange}
          />
          <span className="popup__error username-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="text"
            name="userJob"
            id="about-input"
            className="popup__input popup__input_type_job"
            placeholder="О себе"
            minLength="2"
            maxLength="200"
            required
            value={description || ''}
            onChange={handleDescriptionChange}
          />
          <span className="popup__error about-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
