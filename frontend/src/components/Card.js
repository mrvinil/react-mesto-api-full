import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some((item) => item._id === currentUser._id);
  const cardDeleteButtonClassName = (
    `cards__trash ${isOwn ? '' : 'cards__trash_hidden'}`
  );
  const cardLikeButtonClassName = (
    `cards__like-button ${isLiked ? 'cards__like-button_active' : ''}`
  );

  function handleCardClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return(
    <article className="cards__item">
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button"></button>
      <img src={props.card.link} alt={props.card.name} className="cards__img" onClick={handleCardClick}/>
      <div className="cards__caption">
        <h2 className="cards__name">{props.card.name}</h2>
        <div className="cards__like-wrap">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
          <span className="cards__like-count">{props.card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
