import React from 'react';
import {Link, Route} from 'react-router-dom';

function Header({email, onSignOut }) {
  return(
    <header className="header">
      {/*eslint-disable-next-line*/}
      <Link to="/" className="header__logo" aria-label="Go home"></Link>
        <div className="header__auth">
          <Route exact path="/">
            <div className="header__user-login">{email}</div>
            <Link to="/sign-in" className="header__auth-login" onClick={onSignOut}>Выйти</Link>
          </Route>
          <Route exact path="/sign-in">
            <Link to="/sign-up" className="header__auth-login">Регистрация</Link>
          </Route>
          <Route exact path="/sign-up">
            <Link to="/sign-in" className="header__auth-login">Войти</Link>
          </Route>
        </div>
    </header>
  );
}

export default Header;
