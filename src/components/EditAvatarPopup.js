import React from "react";
import PopupWithForm from "./PopupWithForm";
import { TranslationContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onCloseClickConteiner,
  onUpdateAvatar
}) {
  const [urlAvatar, setUrlAvatar] = React.useState("");
  const urlRef = React.useRef();

  function handleOnChange() {
    setUrlAvatar(urlRef.current.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ avatar: urlAvatar });
  }

  return (
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
              onChange={handleOnChange}
              ref={urlRef}
            />
            <span className="link-input-error"></span>
          </div>
        </>
      }
      buttonText={"Сохранить"}
      isOpen={isOpen}
      onClose={onClose}
      onCloseClickConteiner={onCloseClickConteiner}
      onSubmit={handleSubmit}
    />
  );
}
