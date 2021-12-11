function InfoTooltip({imgInfoTooltip, title, isOpen, onClose, onCloseClickConteiner}) {
    
    return (
      <div className={`popup ${isOpen ? "popup_show" : ""}`}  onClick={onCloseClickConteiner}>
        <div className="popup__container">
          <button
            type="button"
            className="popup__form-button-exit"
            aria-label="кнопка закрытия формы"
            onClick={onClose}
          ></button>
  
          <form className="popup__form popup__form_type_infoTooltip section">
          <img
              style={{ backgroundImage: `url(${imgInfoTooltip})` }}
              alt=""
              className="profile__avatar"
            />
          <h2 className="popup__form-title popup__form-title_type_infoTooltip section-title">{title}</h2>
           
        </form>
        </div>
      </div>
    );
  }
  
  export default InfoTooltip;
