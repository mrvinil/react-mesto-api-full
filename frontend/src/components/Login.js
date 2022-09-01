import React, {useState} from 'react';
import Header from './Header';
import AuthPageWithForm from './AuthPageWithForm';
import {Link} from 'react-router-dom';

function Login({ onLogin, isLoading, loggedIn, onRenderLoading, }) {
  const [userData, setUserData] = useState({email: '', password: ''});

  function handleChange(e) {
    const {name, value} = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  }

  function handleSubmit(e) {
    onRenderLoading(true);
    e.preventDefault();
    const {email, password} = userData;
    onLogin({email, password});
  }

  return (
    <>
      {!loggedIn &&
        <Header>
          <Link className="header__exit" to="/sign-up">Регистрация</Link>
        </Header>}
      <AuthPageWithForm
        name="login"
        title="Вход"
        email={userData.email}
        password={userData.password}
        buttonText={isLoading ? 'Вход...' : 'Войти'}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}

export default Login;
