function ImagePopup({ card, onClose, onCloseClickConteiner }) {
  return (
    <div
      className={`popup popup_type_viewer ${card ? "popup_show" : ""}`}
      onClick={onCloseClickConteiner}
    >
      <div className={`popup__container popup__container_type_viewer`}>
        <button
          type="button"
          className="popup__form-button-exit"
          aria-label="кнопка закрытия формы изоображения"
          onClick={onClose}
        ></button>

        <figure className="popup__figure">
          <img
            src={card ? card.link : ""}
            alt={card ? card.name : ""}
            className="popup__image"
          />
          <figcaption className="popup__caption">
            {card ? card.name : ""}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

export default ImagePopup;
