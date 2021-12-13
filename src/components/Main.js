import Card from "../components/Card";
import Footer from "./Footer";
import Header from "./Header";
import pencel from "../images/Pencil.svg";
import React from "react";
import { СurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
  handleSetLoggedIn,
  userEmail,
}) {
  const currentUser = React.useContext(СurrentUserContext);

  return (
    <>
      <Header handleSetLoggedIn={handleSetLoggedIn} userEmail={userEmail} />
      <main className="content section page__content">
        <section className="profile section">
          <div className="profile__figure">
            <div className="profile__avatar-section" onClick={onEditAvatar}>
              <img
                src={currentUser.avatar}
                alt="аватар"
                className="profile__avatar"
              />
              <img src={pencel} alt="ковер" className="profile__avatar-cover" />
            </div>
            <div className="profile__info">
              <div className="profile__info-text">
                <h1 className="profile__title section-title">
                  {currentUser.name}
                </h1>
                <p className="profile__text section-title section-title_size_medium">
                  {currentUser.about}
                </p>
              </div>
              <button
                type="button"
                className="profile__edit-button"
                aria-label="кнопка редактирования профиля"
                onClick={onEditProfile}
              ></button>
            </div>
          </div>
          <button
            type="button"
            className="profile__add-button"
            aria-label="кнопка добавления картинок"
            onClick={onAddPlace}
          ></button>
        </section>
        <section className="elements section" aria-label="фотогалерея">
          <ul className="elements__list">
            {cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))}
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Main;
