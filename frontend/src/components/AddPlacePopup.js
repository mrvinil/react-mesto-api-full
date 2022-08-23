import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  React.useEffect(() => {
    setName('');
    setLink('');
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault()
    props.onAddPlace({
      name: name,
      link: link,
    })
  }

  return (
    <PopupWithForm
      popupID="popup__card"
      formID="popup__form_card"
      title="Новое место"
      name="cardForm"
      buttonValue="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__field-wrap">
        <label className="popup__field">
          <input
            type="text"
            name="nameImg"
            id="title-input"
            className="popup__input popup__input_card-name"
            placeholder="Название"
            minLength="2"
            maxLength="30"
            required
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__error title-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            name="linkImg"
            id="url-input"
            className="popup__input popup__input_card-link"
            placeholder="Ссылка на картинку"
            required
            value={link}
            onChange={handleLinkChange}
          />
          <span className="popup__error url-input-error"></span>
        </label>
      </fieldset>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
