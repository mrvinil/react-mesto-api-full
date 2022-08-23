import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
  }

  return(
    <PopupWithForm
      popupID="popup__avatar"
      formID="popup__form_avatar"
      title="Обновить аватар"
      name="profileAvatar"
      buttonValue="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <label className="popup__field">
          <input
            type="url"
            name="avatarLink"
            id="avatarUrl-input"
            className="popup__input popup__input_card-link"
            placeholder="Ссылка на картинку"
            required
            ref={avatarRef}
          />
          <span className="popup__error avatarUrl-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
