
function PopupWithForm({ name, title, children, buttonText, isOpen, onClose, onCloseClickConteiner, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_show" : ""}`}  onClick={onCloseClickConteiner}>
      <div className={`popup__container popup__container_type_${name}`}>
        <button
          type="button"
          className="popup__form-button-exit"
          aria-label="кнопка закрытия формы подтверждения удаления карточки"
          onClick={onClose}
        ></button>

        <form
          onSubmit={onSubmit}
          className={`popup__form popup__form_${name} section`}
          name={`form-${name}`}
        >
          <h2 className="popup__form-title section-title">{title}</h2>
          {children}
          <button type="submit" className="popup__form-button-save">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;

