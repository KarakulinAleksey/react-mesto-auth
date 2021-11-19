
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm'
import ImagePopup from "./ImagePopup";
import React from 'react';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  function closeAllPopups(){
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setAvatarPopupOpen(false);
    setSelectedCard(false);
    document.removeEventListener("keydown", handleEscClose);
  }

  function handleEscClose(evt) {
    if (evt.key === "Escape") {
      closeAllPopups();
    }
  }

  function closeClickConteiner(e){
    const evtTarget = e.target;
    if (evtTarget.closest(".popup__container") == null) {
      closeAllPopups();
    }
  }

  function openProfilePopup(){
    setEditProfilePopupOpen(true);
    document.addEventListener("keydown", handleEscClose);
  }

  function openAvatarPopup(){
    setAvatarPopupOpen(true);
    document.addEventListener("keydown", handleEscClose);
  }

  function openAddPlacePopup(){
    setAddPlacePopupOpen(true);
    document.addEventListener("keydown", handleEscClose);
  }


  return (
    <>
      <Header />
      <Main onEditProfile={openProfilePopup}
            onEditAvatar={openAvatarPopup}
            onAddPlace={openAddPlacePopup}
            onCardClick={setSelectedCard}  
      />
      <Footer />
      <PopupWithForm
        name={"edit-profile"}
        title={"Редактировать профиль"}
        children={
          <>
            <div className="popup__container-input">
              <input
                name="name"
                placeholder="Введите имя"
                type="text"
                className="popup__form-input section-title popup__form-input_type_name"
              />
              <span className="name-input-error"></span>
            </div>
            <div className="popup__container-input">
              <input
                name="profession"
                placeholder="Введите профессию"
                type="text"
                className="popup__form-input section-title popup__form-input_type_profession"
              />
              <span className="profession-input-error"></span>
            </div>
          </>
        }
        buttonText={"сохранить"}
        isOpen = {isEditProfilePopupOpen}
        onClose = {closeAllPopups}
        onCloseClickConteiner = {closeClickConteiner}       
      />

      <PopupWithForm
        name={"new-mesto"}
        title={"Новое место"}
        children={
          <>
            <div className="popup__container-input">
              <input
                name="name"
                placeholder="Название"
                type="text"
                className="popup__form-input section-title popup__form-input_type_cart-name"
              />
              <span className="name-input-error"></span>
            </div>
            <div className="popup__container-input">
              <input
                name="link"
                placeholder="Ссылка на картинку"
                type="url"
                className=" popup__form-input section-title popup__form-input_type_cart-link"
              />
              <span className="link-input-error"></span>
            </div>
          </>
        }
        buttonText={"создать"}
        isOpen = {isAddPlacePopupOpen}
        onClose = {closeAllPopups}
        onCloseClickConteiner = {closeClickConteiner}
        
      />

      {<PopupWithForm
        name={"confirm"}
        title={"Вы уверены?"}
        children={<></>}
        buttonText={"Да"}
        onClose = {closeAllPopups}
        onCloseClickConteiner = {closeClickConteiner}
      /> }

      <PopupWithForm
        name={"update-avatar"}
        title={"Обновить аватар"}
        children={
          <>
            <div className="popup__container-input">
              <input
                name="link"
                placeholder="Ссылка на картинку"
                type="url"
                className="popup__form-input section-title popup__form-input_type_cart-link"
              />
              <span className="link-input-error"></span>
            </div>
          </>
        }
        buttonText={"Сохранить"}
        isOpen = {isAvatarPopupOpen}
        onClose = {closeAllPopups}
        onCloseClickConteiner = {closeClickConteiner}
      />

      <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
        onCloseClickConteiner = {closeClickConteiner}
      />
    
    </>
  );
}

export default App;
