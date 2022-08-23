import React from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({onEditAvatar, onEditProfile, onAddPlace, cards, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content container">
      <section className="profile">
        <div className="profile__wrap">
          <div className="profile__avatar-wrap" onClick={onEditAvatar}>
            <img className="profile__avatar" src={currentUser.avatar} alt="Ваш аватар"/>
          </div>
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__edit" type="button" onClick={onEditProfile}></button>
            <p className="profile__about">{currentUser.about}</p>
          </div>
        </div>
        <button className="profile__add" type="button" onClick={onAddPlace}></button>
      </section>

      <section className="cards section-gap">
        {
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        }
      </section>

    </main>
  );
}

export default Main;
