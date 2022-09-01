import React, {useContext} from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.owner === currentUser._id;
  const cardDeleteButtonClassName = (`place__cart ${isOwn ? 'place__cart-active' : ''}`);
  const isLiked = props.likes.some(i => i === currentUser._id);
  const cardLikeButtonClassName = `place__favorite ${isLiked ? 'place__favorite_active' : ''}`;

  function handleClick() {
    props.onCardClick(props);
  }

  function handleLikeClick() {
    props.onCardLike(props);
  }

  function handleDeleteClick() {
    props.onCardDelete(props);
  }

  return (
    <li className="place">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
      <img src={props.link} alt={props.name} className="place__image" onClick={handleClick}/>
      <div className="place__name">
        <h2 className="place__title">{props.name}</h2>
        <div className="place__block-like">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className="place__like-counter">{props.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
