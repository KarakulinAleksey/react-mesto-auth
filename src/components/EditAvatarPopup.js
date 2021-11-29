import React from "react";
import PopupWithForm from "./PopupWithForm";
// import { TranslationContext } from "../contexts/CurrentUserContext";

export default function EditAvatarPopup({
  isOpen,
  onClose,
  onCloseClickConteiner,
  onUpdateAvatar
}) {
  const urlRef = React.useRef();

  React.useEffect(() => {
    urlRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar: urlRef.current.value });
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
