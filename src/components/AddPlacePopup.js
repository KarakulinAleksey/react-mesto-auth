import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({isOpen, onClose, onCloseClickConteiner, onAppPlace}) {
  const [cardName, setCardName] = React.useState("");
  const [cardLink, setCardLink] = React.useState("");

  React.useEffect(() => {
    setCardName('');
    setCardLink('');
  }, [isOpen]);

  function handleChangeCardName(item) {
    setCardName(item.target.value);
  }

  function handleChangeCardLink(item) {
    setCardLink(item.target.value);
  }

  function handleAppPlaceSubmit(e) {
    e.preventDefault();
    onAppPlace({cardName, cardLink});
  }

  return (
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
                onChange={handleChangeCardName}
                value={cardName}
            />
            <span className="name-input-error"></span>
            </div>
            <div className="popup__container-input">
            <input
                name="link"
                placeholder="Ссылка на картинку"
                type="url"
                className=" popup__form-input section-title popup__form-input_type_cart-link"
                onChange={handleChangeCardLink}
                value={cardLink}
            />
            <span className="link-input-error"></span>
            </div>
        </>
        }
        buttonText={"создать"}
        isOpen={isOpen}
        onClose={onClose}
        onCloseClickConteiner={onCloseClickConteiner}
        onSubmit={handleAppPlaceSubmit}

    />
  );
}
