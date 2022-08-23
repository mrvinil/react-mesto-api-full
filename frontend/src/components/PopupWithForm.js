function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.popupID}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <form
          action="#"
          name={props.name}
          className="popup__form"
          id={props.formID}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button className="popup__button" type="submit" name="popupSubmit">{props.buttonValue}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
