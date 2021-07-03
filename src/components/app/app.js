import React, { useEffect, useState } from "react";
import Cards from "../cards/cards";
import Svg from "../svg/svg";
import Spinner from "../spinner/spinner";
import "./app.sass";
import "./media.sass";

// Фукция создающая блоки
function createCards(arr, error, max) {
  // Проверка на ошибку
  if (error) {
    return;
  }
  // Создание карточек
  return arr.map((item, index) => {
    if (index >= max) {
      return null;
    }
    const { id, oldPrice, price, title, seen, locality, date } = item;
    return (
      // Передаём пропсы
      <div key={id} className="content__inner">
        <Cards id={id} oldPrice={oldPrice} price={price} title={title} seen={seen} locality={locality} date={date} />
      </div>
    );
  });
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cardsArr, setCardsArr] = useState([]);
  const [maxCards, setMaxCards] = useState(16);
  const [limit, setLimit] = useState(0);

  useEffect(() => {
    fetch("https://6075786f0baf7c0017fa64ce.mockapi.io/products")
      .then((response) => response.json())
      .then((result) => {
        if (limit === 0) {
          setLoading(false);
          setCardsArr(result);
          setLimit(limit + 1);
        }
      })
      .catch((e) => {
        setError(true);
        setLoading(false);
      });
  });

  // Количество отоброжаемых блоков
  const updateShowCards = () => {
    if (maxCards === 16) {
      setMaxCards(cardsArr.length);
    } else {
      setMaxCards(16);
    }
  };

  // Отоброжение контента
  const content = loading ? <Spinner /> : createCards(cardsArr, error, maxCards);

  // Кнопка отоброжения количества карточек
  const viewCards =
    maxCards === 16 ? (
      <div onClick={updateShowCards} className="more">
        Показать ещё
      </div>
    ) : (
      <div onClick={updateShowCards} className="min">
        Свернуть
      </div>
    );

  // Проверка на ошибку
  if (error) {
    return (
      <div className="error">
        <h1>Error</h1>
        <h2>Please try again later.</h2>
      </div>
    );
  }

  return (
    <div className="container">
      <Svg />
      <header>
        <h1 className="title">Похожие объявления</h1>
      </header>
      <main className="main">
        <section className="content">{content}</section>
      </main>
      <footer className="footer">{viewCards}</footer>
    </div>
  );
}

export default App;
