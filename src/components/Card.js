import React from "react"; //11
import { СurrentUserContext } from "../contexts/CurrentUserContext"; //11

function Card({ onCardClick, onCardLike, onCardDelete, card}){

  const currentUser = React.useContext(СurrentUserContext); //11
  const isOwn = card.owner._id === currentUser._id;

  const isLiked = card.likes.some(i => i._id === currentUser._id);//11

  const cardLikeButtonClassName = (
    `elements__image-likee new-like ${isLiked ? 'elements__image-like_active' : ''}`
  ); //11

  const cardDeleteButtonClassName = (
    `elements__button-remove ${isOwn ? 'popup_show' : ''}`
  ); //11

  const handleCardClick = () =>{
    onCardClick(card);
  }

  const handleLikeClick = () =>{
    onCardLike(card);
  }

  const handleDeleteClick = () =>{
    onCardDelete(card);
  }

  return (
    <li className="elements__element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="кнопка удаления изображения"></button>
      <img src={card.link} alt={card.name} id="elements__image" className="elements__image" onClick={handleCardClick}/>
      <div className="elements__likee">
        <h2 className="elements__title">{card.name}</h2>
        <div className='elements__conteiner-count-likee'>
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
          <p className='elements__count-likee'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  
  );
}

export default Card;

 