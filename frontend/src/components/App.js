import React, {useState, useEffect} from 'react';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import {api} from '../utils/api';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({name: '', link: ''});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (loggedIn) {
      history.push('/');
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileInfo(), api.getInitialCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards([...cards]);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function renderLoading(value) {
    setIsLoading(value);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);

    api.likeCard(!isLiked ? 'PUT' : 'DELETE', card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => console.log(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => console.log(err));
  }

  function handleUpdateUser(data) {
    api.changeUserInfo(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    api.postNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch(err => console.log(err))
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleLogin({email, password}) {
    setUserData({email, password});
    auth.authorize({email, password})
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  function handleRegister({email, password}) {
    auth.register({email, password})
      .then((res) => {
        if (res.statusCode === 400 || !email || !password) {
          setIsSuccess(false);
          setIsInfoTooltipOpen(true);
        } else {
          history.push('/sign-in');
          setIsSuccess(true);
          setIsInfoTooltipOpen(true);
        }
      })
      .catch((err) => {
        setIsSuccess(false);
        setIsInfoTooltipOpen(true);
        console.log(err);
      })
      .finally(() => {
        renderLoading(false);
      });
  }

  const history = useHistory();

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({name: '', link: ''});
  }

  function signOut() {
    auth.logout();
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          {loggedIn &&
            <Header>
              <div className="header__auth">
                <div className="header__email">{`${userData.email}`}</div>
                <Link onClick={signOut} className="header__exit" to="/">Выйти</Link>
              </div>
            </Header>}
          <Switch>
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
                isLoading={isLoading}
                loggedIn={loggedIn}
                onRenderLoading={renderLoading}
              />
            </Route>
            <Route path="/sign-in">
              <Login
                onLogin={handleLogin}
                isLoading={isLoading}
                loggedIn={loggedIn}
                onRenderLoading={renderLoading}
              />
            </Route>
            <ProtectedRoute
              exact path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              cards={cards}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}/>
          </Switch>
          {loggedIn && <Footer/>}
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
            onRenderLoading={renderLoading}/>
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
            onRenderLoading={renderLoading}/>
          <PopupWithForm
            name="confirmation"
            title="Вы уверены?"
            buttonText="Да"
            onClose={closeAllPopups}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onUpdateAvatar={handleUpdateAvatar}
            onClose={closeAllPopups}
            isLoading={isLoading}
            onRenderLoading={renderLoading}/>
          <InfoTooltip
            isOpen={isInfoTooltipOpen}
            isSuccess={isSuccess}
            onClose={closeAllPopups}
            toolTipText={isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
          />
          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}/>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
