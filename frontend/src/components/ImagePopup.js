function ImagePopup(props) {
  return(
    <div className={`popup popup_type_modal-img ${props.card && 'popup_opened'}`} id="popup__img">
      <div className="popup__container popup__container_type_modal-img">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <figure className="modal">
          <img src={props.card?.link} alt={props.card?.name} className="modal__img"/>
          <figcaption className="modal__name">{props.card?.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
