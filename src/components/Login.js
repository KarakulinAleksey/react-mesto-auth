import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import headerLogo from "../images/logo.svg";
import * as auth from "../auth.js";

function Login({ handleSetLoggedIn }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function onLogin(data) {
    localStorage.setItem("jwt", data.token);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .authorize(password, email)
      .then((res) => {
        if (res.token) {
          setEmail("");
          setPassword("");
          handleSetLoggedIn(true);
          onLogin(res);
          history.push("/");
        }
      })
      .catch((err) => console.log("Ошибка при авторизации ", err));
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <header className="header section page__header">
        <a className="logo header__logo" href="#">
          <img
            className="logo__image"
            src={headerLogo}
            alt="Логотип сервиса Место"
          />
        </a>
        <NavLink className="header__link" to="/sing-up">
          Регистрация
        </NavLink>
      </header>

      <form
        className="form-registration section"
        name="form-login"
        onSubmit={handleSubmit}
      >
        <h2 className="form-registration__title section-title">Вход</h2>
        <input
          name="name"
          placeholder="Email"
          type="text"
          className="form-registration__input section-title popup__form-input_type_name"
          value={email}
          required
          onChange={handleChangeEmail}
        />
        <input
          name="profession"
          placeholder="Пароль"
          type="text"
          className="form-registration__input section-title popup__form-input_type_profession"
          value={password}
          required
          onChange={handlePassword}
        />
        <button type="submit" className="form-registration__button">
          Войти
        </button>
      </form>
    </>
  );
}

export default Login;
