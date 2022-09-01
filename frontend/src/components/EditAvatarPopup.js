import React, {useRef} from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(
  {
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading,
    onRenderLoading
  }) {

  const avatarRef = useRef();

  function handleSubmit(e) {
    onRenderLoading(true);
    e.preventDefault();
    onUpdateAvatar(
      {
        avatar: avatarRef.current.value
      });
    e.target.reset();
  }

  return (
    <PopupWithForm
      name="update-avatar"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      onClose={onClose}>
      <h2 className="popup__title">Обновить аватар</h2>
      <div className="popup__inputs">
        <label className="popup__label">
          <input
            id="avatar-link"
            className="popup__input popup__input_text_avatar-link"
            type="url"
            name="avatar"
            ref={avatarRef}
            placeholder="Ссылка на аватар"
            required
          />
          <span className="popup__input-error avatar-link-error"></span>
        </label>
        <button type="submit" className="popup__btn">{isLoading ? 'Сохраняю...' : 'Сохранить'}</button>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
