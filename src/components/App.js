
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import { api } from "../utils/Api";
import { СurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as auth from "../utils/auth.js";
import infoTooltipImgSuccess from "../images/imgSuccess.jpg";
import infoTooltipImgFail from "../images/imgFail.jpg";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [infoTooltipPopupOpen, setInfoTooltipPopupOpen] = React.useState(false);
  const [titleInfoTooltip, setTitleInfoTooltip] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [imgInfoTooltip, setImgInfoTooltip] = React.useState("");

  const history = useHistory();

  React.useEffect(() => {
    const getAllCards = api.getAllCards();
    getAllCards
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log("Запрос всех карточек при загрузке страницы " + err);
      });
  }, []);

  React.useEffect(() => {
    const getUserInfoData = api.getUserInfo();
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

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            history.push("/");
            handelSetUserEmail(res.data.email);
          }
        })
        .catch((err) => {
          console.log("Проверка токена " + err);
        });
    }
  }, [loggedIn]);

  function handelSetUserEmail(email) {
    setUserEmail(email);
  }

  function handleSetLoggedIn(on) {
    setLoggedIn(on);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .likeCard(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log("Запрос лайк карточек " + err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
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
    console.log(cardName, cardLink);
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
    setIsEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setSelectedCard(null);
    setInfoTooltipPopupOpen(false);
  }

  function closeClickConteiner(e) {
    const evtTarget = e.target;
    if (evtTarget.closest(".popup__container") == null) {
      closeAllPopups();
    }
  }

  function openProfilePopup() {
    setIsEditProfilePopupOpen(true);
  }

  function openAvatarPopup() {
    setAvatarPopupOpen(true);
  }

  function openAddPlacePopup() {
    setAddPlacePopupOpen(true);
  }

  function openInfoTooltipPopup(flag) {
    if (flag) {
      setInfoTooltipPopupOpen(true);
      setTitleInfoTooltip("Вы успешно зарегистрировались!");
      setImgInfoTooltip(infoTooltipImgSuccess);
    } else {
      setInfoTooltipPopupOpen(true);
      setTitleInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
      setImgInfoTooltip(infoTooltipImgFail);
    }
  }

  return (
    <СurrentUserContext.Provider value={currentUser}>
      <Switch>
        {/* <> */}
          <ProtectedRoute
            path="/" 
            exact
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={openProfilePopup}
            onEditAvatar={openAvatarPopup}
            onAddPlace={openAddPlacePopup}
            onCardClick={setSelectedCard}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            handleSetLoggedIn={handleSetLoggedIn}
            userEmail={userEmail}
          />

          <Route path="/sing-up">
            <Register openInfoTooltipPopup={openInfoTooltipPopup} />
          </Route>

          <Route path="/sing-in">
            <Login handleSetLoggedIn={handleSetLoggedIn} />
          </Route>
        {/* </> */}
      </Switch>

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

      <InfoTooltip
        imgInfoTooltip={imgInfoTooltip}
        title={titleInfoTooltip}
        isOpen={infoTooltipPopupOpen}
        onClose={closeAllPopups}
        onCloseClickConteiner={closeClickConteiner}
      />
    </СurrentUserContext.Provider>
  );
}

export default App;
