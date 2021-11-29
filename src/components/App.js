import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/Api"; 
import { TranslationContext } from "../contexts/CurrentUserContext"; 
import EditProfilePopup from "./EditProfilePopup"; 
import EditAvatarPopup from "./EditAvatarPopup"; 
import AddPlacePopup from "./AddPlacePopup"; 

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({}); 

  const [cards, setCards] = React.useState([]);

  const getAllCards = api.getAllCards();

  React.useEffect(() => {
    getAllCards
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log("Запрос всех карточек при загрузке страницы " + err);
      });
  }, []);

  const getUserInfoData = api.getUserInfo(); 

  React.useEffect(() => {
    getUserInfoData
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log("Запрос данных пользователя при загрузе страницы " + err);
      });
  }, []); 

  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === "Escape") {
        closeAllPopups();
      }
    };

    document.addEventListener("keydown", closeByEscape);

    return () => document.removeEventListener("keydown", closeByEscape);
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api.likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.log("Запрос лайк карточек " + err);
      });
  } 

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log("Запрос удаление карточки " + err);
      });
  } 

  function handleUpdateUser({ name, about }) {
    const editUserInfo = api.editUserInfo(name, about);
    editUserInfo
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Запрос обновления данных пользователя " + err);
      });
      
  }

  function handleAddPlaceSubmit({ cardName, cardLink }) {
    console.log(cardName, cardLink )
    const addCard = api.addCard(cardName, cardLink);
    addCard
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Запрос добавления новой карточки " + err);
      });
    
  }

  function handleUpdateAvatar({ avatar }) {
    const editAvatar = api.editAvatar(avatar);
    editAvatar
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log("Запрос обновления аватара " + err);
      });
     
  }

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  function closeClickConteiner(e) {
    const evtTarget = e.target;
    if (evtTarget.closest(".popup__container") == null) {
      closeAllPopups();
    }
  }

  function openProfilePopup() {
    setEditProfilePopupOpen(true);
  }

  function openAvatarPopup() {
    setAvatarPopupOpen(true);
  }

  function openAddPlacePopup() {
    setAddPlacePopupOpen(true);
  }



  return (
    <>
      <TranslationContext.Provider value={currentUser}>
        <Header />
        <Main
          onEditProfile={openProfilePopup}
          onEditAvatar={openAvatarPopup}
          onAddPlace={openAddPlacePopup}
          onCardClick={setSelectedCard}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />
        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onCloseClickConteiner={closeClickConteiner}
          onUpdateUser={handleUpdateUser}
        />

        <AddPlacePopup
           isOpen={isAddPlacePopupOpen}
           onClose={closeAllPopups}
           onCloseClickConteiner={closeClickConteiner}
           onAppPlace={handleAddPlaceSubmit}
        />

        {
          <PopupWithForm
            name={"confirm"}
            title={"Вы уверены?"}
            children={<></>}
            buttonText={"Да"}
            onClose={closeAllPopups}
            onCloseClickConteiner={closeClickConteiner}
          />
        }

        <EditAvatarPopup
          isOpen={isAvatarPopupOpen}
          onClose={closeAllPopups}
          onCloseClickConteiner={closeClickConteiner}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
          onCloseClickConteiner={closeClickConteiner}
        />
      </TranslationContext.Provider>
    </>
  );
}

export default App;
