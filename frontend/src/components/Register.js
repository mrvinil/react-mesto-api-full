import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthPageWithForm from './AuthPageWithForm';
import Header from './Header';

function Register({ onRegister, isLoading, loggedIn, onRenderLoading, }) {
  const [userData, setUserData] = useState({email: '', password: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const {email, password} = userData;
    onRegister({email, password});
    onRenderLoading(true);
  }

  return (
    <>
      {!loggedIn &&
        <Header>
          <Link className="header__exit" to="sign-in">Войти</Link>
        </Header>
      }
      <AuthPageWithForm
        name="register"
        title="Регистрация"
        email={userData.email}
        password={userData.password}
        buttonText={isLoading ? 'Зарегистрироваться...' : 'Зарегистрироваться'}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div className="auth__register-signin">
          <p className="auth__register-text">Уже зарегистрированы?
            <Link to="sign-in" className="auth__register-link"> Войти</Link>
          </p>
        </div>
      </AuthPageWithForm>
    </>
  );
}

export default Register;
