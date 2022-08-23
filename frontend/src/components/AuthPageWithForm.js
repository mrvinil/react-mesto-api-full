import React from 'react';
import {Link} from "react-router-dom";

function AuthPageWithForm(props) {
  const authUrl = '/sign-in';

  return (
    <div className="auth">
      <form
        name={props.name}
        className="auth__form"
        id={props.formID}
        onSubmit={props.onSubmit}
      >
        <fieldset className="auth__field-wrap">
          <h2 className="auth__title">{props.title}</h2>
          {props.children}
        </fieldset>
        <fieldset className="auth__field-wrap auth__field-wrap_type_buttons">
          <button className="auth__button" type="submit" name="authSubmit">{props.buttonValue}</button>
          {
            props.name === 'registerForm' && (<Link to={authUrl} className="auth__link">Уже зарегистрированы? Войти</Link>)
          }
        </fieldset>
      </form>
    </div>
  );
}

export default AuthPageWithForm;
