import React from 'react';

function InfoTooltip(props) {
  return (
    <div className={`popup ${props.isOpen && 'popup_opened'}`} id={props.popupID}>
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <div className="tooltip">
          <img src={props.imgPath} alt={props.title}/>
          <h2 className="tooltip__title">{props.title}</h2>
        </div>
      </div>
    </div>
  );
}

export default InfoTooltip;
