import headerLogo from "../images/logo.svg";

function Header() {
  return (
    <header className="header section page__header">
      <a className="logo header__logo" href="#">
        <img className="logo__image" src={headerLogo} alt="Логотип сервиса Место" />
      </a>
    </header>
  );
}

export default Header;
