
import { api } from "../utils/Api";
import Card from "../components/Card";
import pencel from "../images/Pencil.svg";
import React from "react";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {

  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  // console.log('2121');

  const getUserInfoData = api.getUserInfo();
  React.useEffect(() => {
    getUserInfoData
      .then((data) => {
        setUserName(data.name);
        setUserDescription(data.about);
        setUserAvatar(data.avatar);
        // console.log(data);
      }, [])

      .catch((err) => {
        console.log("Запрос данных пользователя при загрузе страницы " + err);
      });
  });

  const getAllCards = api.getAllCards();
  React.useEffect(() => {
    getAllCards
      .then((data) => {
        // console.log(data);
        setCards(data.map((item) => ({
          id: item._id,
          name: item.name,
          likes: item.likes.length,
          link: item.link,
        })));
      }, [])

      .catch((err) => {
        console.log("Запрос всех карточек при загрузке страницы " + err);
      });
  });

  
  return (
    <main className="content section page__content">
      <section className="profile section">
        <div className="profile__figure">
          <div className="profile__avatar-section" onClick={onEditAvatar}>
            <img
              style={{ backgroundImage: `url(${userAvatar})` }}
              alt=""
              className="profile__avatar"
            />
            <img src={pencel} alt="ковер" className="profile__avatar-cover" />
          </div>
          <div className="profile__info">
            <div className="profile__info-text">
              <h1 className="profile__title section-title">{userName}</h1>
              <p className="profile__text section-title section-title_size_medium">
                {userDescription}
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
          {
            // cards.map(({id, ...props}) => <Card key={id} {...props} />) 
            cards.map((card) => <Card key={card.id} card={card} onCardClick={onCardClick}/*name={item.name} link={item.link} likes={item.likes}*/  /*handleCardClick={onCardClick}*//>)
          }      
        </ul>
      </section>
    </main>
  );
}

export default Main;
