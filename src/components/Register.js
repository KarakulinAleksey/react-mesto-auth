import React from "react";
import { NavLink, useHistory } from "react-router-dom";
import * as auth from "../utils/auth.js";
import Header from "./Header";

function Register({ openInfoTooltipPopup }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .register(password, email)
      .then((res) => {
       // if (res.data) {
        if (!(typeof res === "undefined")) { // 15
          openInfoTooltipPopup(true);
          history.push("/sing-in");
        } else {
          openInfoTooltipPopup(false);
        }
      })
      .catch((err) => {
        console.log("Ошибка регистрации ", err);
        openInfoTooltipPopup(false);
      });
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  return (
    <>
      <Header />

      <form
        className="form-registration section"
        name="form-login"
        onSubmit={handleSubmit}
      >
        <h2 className="form-registration__title section-title">Регистрация</h2>
        <input
          name="email"
          placeholder="Email"
          type="text"
          className="form-registration__input section-title"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <input
          name="password"
          placeholder="Пароль"
          type="text"
          className="form-registration__input section-title"
          value={password}
          onChange={handlePassword}
          required
        />
        <button type="submit" className="form-registration__button">
          Зарегистрироваться
        </button>
        <p className="form-registration__title-bottom-button">
          Уже зарегистрированны?&ensp;
          <NavLink
            className="form-registration__link-bottom-button"
            to="/sing-in"
          >
            Войти
          </NavLink>
        </p>
      </form>
    </>
  );
}

export default Register;
