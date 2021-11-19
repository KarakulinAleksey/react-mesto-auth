function Card({ onCardClick, card}){
  const handleCardClick = () =>{
    onCardClick(card);
  }

  return (
    <li className="elements__element">
      <button type="button" className="elements__button-remove" aria-label="кнопка удаления изображения"></button>
      <img src={card.link} alt={card.name} id="elements__image" className="elements__image" onClick={handleCardClick}/>
      <div className="elements__likee">
        <h2 className="elements__title">{card.name}</h2>
        <div className='elements__conteiner-count-likee'>
          <button type="button" className="elements__image-likee new-like"></button>
          <p className='elements__count-likee'>{card.likes.length}</p>
        </div>
      </div>
    </li>
  
  );
}

export default Card;

 