import React from 'react';
import AuthPageWithForm from "./AuthPageWithForm";

function Login({ onAuth }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChange(e) {
    const {value} = e.target;
    e.target.name === 'userEmail' ? setEmail(value) : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAuth(password, email);
  }

  return (
    <AuthPageWithForm
      name="loginForm"
      title="Вход"
      buttonValue="Войти"
      id="auth-form"
      onSubmit={handleSubmit}
    >
      <label className="auth__field">
        <input
          type="email"
          name="userEmail"
          id="useremail-input"
          className="auth__input"
          placeholder="Email"
          required
          value={email || ''}
          onChange={handleChange}
        />
        <span className="auth__error"></span>
      </label>
      <label className="auth__field">
        <input
          type="password"
          name="userPassword"
          id="userpassword-input"
          className="auth__input"
          placeholder="Пароль"
          required
          value={password || ''}
          onChange={handleChange}
        />
        <span className="auth__error"></span>
      </label>
    </AuthPageWithForm>
  );
}

export default Login;