import React from "react";
import { NavLink, useHistory, useLocation } from "react-router-dom";
import headerLogo from "../images/logo.svg";
import * as auth from "../utils/auth";

function Header({ handleSetLoggedIn, userEmail }) {
  const history = useHistory();
  const location = useLocation();

  function onSingOut() {
    auth.logout()     // 15
    .then((res) => {
        if (res) {
           /* handleLogStatus(false);
            setHeaderEmail('');
            props.history.push('signin');
            setCurrentUser({name: '', link: '', avatar: ''});*/
            history.push("/sing-in");
            handleSetLoggedIn(false);
        }
        })
   /* localStorage.removeItem("jwt");
    history.push("/sing-in");
    handleSetLoggedIn(false);*/
  }

  function navLink() {
    if (location.pathname === "/sing-in") {
      return (
        <NavLink className="header__link" to="/sing-up">
          Регистрация
        </NavLink>
      );
    } else if (location.pathname === "/sing-up") {
      return (
        <NavLink className="header__link" to="/sing-in">
          Войти
        </NavLink>
      );
    } else if (location.pathname === "/") {
      return (
        <button className="header__button" onClick={onSingOut}>
          Выйти
        </button>
      );
    }
  }

  return (
    <header className="header section page__header">
      <NavLink className="logo header__logo" to="/">
        <img
          className="logo__image"
          src={headerLogo}
          alt="Логотип сервиса Место"
        />
      </NavLink>
      <p className="header__title">
        {userEmail}&ensp;
        {navLink()}
      </p>
    </header>
  );
}

export default Header;
