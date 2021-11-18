
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

  const [isPopupWithFormOpen, setPopupWithForm] = React.useState(false);

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

  function CloseClickConteiner(e){
    const evtTarget = e.target;
    console.log(evtTarget.closest(".popup__container"));
      if (evtTarget.closest(".popup__container") == null) {
      closeAllPopups();
    }
  }

  return (
    <>
      <Header />
      <Main
        onEditProfile={() => {
          setEditProfilePopupOpen(true);
          document.addEventListener("keydown", handleEscClose);
        }}
        onEditAvatar={() => {
          setAvatarPopupOpen(true);
          document.addEventListener("keydown", handleEscClose);
        }}
        onAddPlace={() => { 
          setAddPlacePopupOpen(true);
          document.addEventListener("keydown", handleEscClose);
        }}
      
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
        onCloseClickConteiner = {CloseClickConteiner}       
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
        onCloseClickConteiner = {CloseClickConteiner}
        
      />

      {<PopupWithForm
        name={"confirm"}
        title={"Вы уверены?"}
        children={<></>}
        buttonText={"Да"}
        onClose = {closeAllPopups}
        onCloseClickConteiner = {CloseClickConteiner}
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
        onCloseClickConteiner = {CloseClickConteiner}
      />

      <ImagePopup
        card = {selectedCard}
        onClose = {closeAllPopups}
        onCloseClickConteiner = {CloseClickConteiner}
      />
    
    </>
  );
}

export default App;
