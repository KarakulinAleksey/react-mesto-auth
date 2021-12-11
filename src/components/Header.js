import { useHistory  } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header({handleSetLoggedIn, userEmail}) {
  const history = useHistory();

  function onSingOut(){
    localStorage.removeItem('jwt');
    history.push("/sing-in");
    handleSetLoggedIn(false);
  }

  return (
    <header className="header section page__header">
      <a className="logo header__logo" href="#">
        <img className="logo__image" src={headerLogo} alt="Логотип сервиса Место" />
      </a>
      <p className="header__title">{userEmail}&ensp;
      <button className="header__button" onClick={onSingOut}>
          Выйти
      </button>
      </p>
    </header>
  );
}

export default Header;
