import React from "react";
import "./cards.sass";
import { mouseStart, mouseMove, mouseUp, dotActiveRemove, dotChangeSlide } from "../carousel/carousel";

function Cards({ id, oldPrice, price, title, seen, locality, date }) {
  // Проверка seen
  const cards = seen ? "cards viewed" : "cards";
  const cardsViewedElem = seen ? <div className="cards__viewed">Просмотрено</div> : null;
  const viewedIcon = seen ? "cards__text-icon cards__text-icon--viewed" : "cards__text-icon";

  // Рандомные картинки
  const url = `https://source.unsplash.com/random`;

  // Дата карточек
  const dateArr = ("" + date).split("");
  const repDate = () => dateArr.splice(0, 2);

  const time = {
    day: repDate(),
    mounth: repDate(),
    year: repDate(),
    hours: repDate(),
    minutes: repDate(),
  };

  const { day, mounth, year, hours, minutes } = time;

  // Работа точек
  function changeSlide(e) {
    dotActiveRemove(id);
    dotChangeSlide(e, id);
  }

  return (
    <div className={cards}>
      <div className="cards__img-block">
        {cardsViewedElem}
        <div onMouseDown={(e) => mouseStart(e, id)} onMouseMove={(e) => mouseMove(e)} onMouseUp={(e) => mouseUp(e, id)} className="cards__carousel">
          <div className="cards__carousel-inner">
            <div className="cards__carousel-block">
              <img className="cards__img" src={url} alt="img"></img>
            </div>
            <div className="cards__carousel-block">
              <img className="cards__img" src={url} alt="img"></img>
            </div>
            <div className="cards__carousel-block">
              <img className="cards__img" src={url} alt="img"></img>
            </div>
            <div className="cards__carousel-block">
              <img className="cards__img" src={url} alt="img"></img>
            </div>
          </div>
        </div>
        <div class="cards__icon-img">
          <svg className="cards__icon-item">
            <use xlinkHref="#compare"></use>
          </svg>
          <svg className="cards__icon-item">
            <use xlinkHref="#heart"></use>
          </svg>
        </div>
        <ul className="cards__dots">
          <li id={0} onClick={(e) => changeSlide(e)} className="cards__dot"></li>
          <li id={1} onClick={(e) => changeSlide(e)} className="cards__dot cards__dot--active"></li>
          <li id={2} onClick={(e) => changeSlide(e)} className="cards__dot"></li>
          <li id={3} onClick={(e) => changeSlide(e)} className="cards__dot"></li>
        </ul>
      </div>
      <div className="cards__text-block">
        <div className="cards__block-icon">
          <svg className={viewedIcon}>
            <use xlinkHref="#truck"></use>
          </svg>
          <svg className={viewedIcon}>
            <use xlinkHref="#deal"></use>
          </svg>
        </div>
        <div className="cards__old-price">{oldPrice} &#8381;</div>
        <div className="cards__price">{price} &#8381;</div>
        <div className="cards__title">{title}</div>
        <div className="cards__inf">
          <div className="cards__locality">Город ({locality.length} симв)</div>
          <div className="cards__date">
            {day}.{mounth}.{year}, {hours}.{minutes}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
