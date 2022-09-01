import React, {useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar" onClick={onEditAvatar}>
          <span className="profile__edit-avatar"></span>
          <img className="profile__image" src={currentUser.avatar} alt="Аватарка"/>
        </div>
        <div className="profile__info">
          <div className="profile__edit-name">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
          </div>
          <p className="profile__job">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>
      <section className="places">
        <ul className="places__list">
          {
            cards.map((card) => (
              <Card
                key={card._id}
                {...card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;
