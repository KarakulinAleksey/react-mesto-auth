import React from "react";
import PopupWithForm from "./PopupWithForm";
import { TranslationContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({isOpen, onClose, onCloseClickConteiner, onUpdateUser}) {
  const [name, setName] = React.useState("");
  const [discription, setDiscription] = React.useState("");

  const currentUser = React.useContext(TranslationContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDiscription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(item) {
    setName(item.target.value);
  }

  function handleChangediscription(item) {
    setDiscription(item.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({name, about: discription});
  }

  return (
    <PopupWithForm
      name={"edit-profile"}
      title={"Редактировать профиль"}
      children={
        <>
          <div className="popup__container-input">
            <input
              autoComplete="off"
              name="name"
              placeholder="Введите имя"
              type="text"
              className="popup__form-input section-title popup__form-input_type_name"
              onChange={handleChangeName}
              value={name || ""}
            />
            <span className="name-input-error"></span>
          </div>
          <div className="popup__container-input">
            <input
              autoComplete="off"
              name="profession"
              placeholder="Введите профессию"
              type="text"
              className="popup__form-input section-title popup__form-input_type_profession"
              onChange={handleChangediscription}
              value={discription || ""}
            />
            <span className="profession-input-error"></span>
          </div>
        </>
      }
      buttonText={"сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseClickConteiner={onCloseClickConteiner}
      onSubmit={handleSubmit}
    />
  );
}
