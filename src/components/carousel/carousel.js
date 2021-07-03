let start = 0;
let move = 0;
let widthBlock = 224;
let dotActive = 1;

// Делает все точки неактивными
const dotActiveRemove = (id) => {
  const dotNav = document.querySelectorAll(".cards__dots")[id - 1].querySelectorAll("li");
  dotNav.forEach((item) => item.classList.remove("cards__dot--active"));
};

// Делает определённую точку активной
const dotActiveAdd = (id) => {
  dotActiveRemove(id);
  document.querySelectorAll(".cards__dots")[id - 1].querySelectorAll(".cards__dot")[dotActive].classList.add("cards__dot--active");
};

// Изменение слайда при нажатие на точку
const dotChangeSlide = (e, id) => {
  // Делаем точку активной
  e.target.classList.add("cards__dot--active");

  const widthImg = 224;
  const dotID = e.target.getAttribute("id");

  // Изменения слайда
  const carousel = document.querySelectorAll(".cards__carousel-inner");
  carousel[id - 1].style.transform = `translateX(-${dotID * widthImg}px)`;

  dotActive = +dotID;
  if (+dotID === 0) {
    widthBlock = 0;
  }
  if (+dotID === 1) {
    widthBlock = 224;
  }
  if (+dotID === 2) {
    widthBlock = 448;
  }
  if (+dotID === 3) {
    widthBlock = 672;
  }
};

const mouseStart = (e, id) => {
  // Первая точка соприкосновения
  start = e.nativeEvent.offsetX;
  move = e.nativeEvent.offsetX;
  e.target.style.cursor = "grabbing";

  // Проверка на стандартную позицию слайда
  let newBlock = getComputedStyle(e.target.parentNode.parentNode).transform;
  if (Array.from(newBlock).splice(20, 3).join("") === "224") {
    widthBlock = 224;
    dotActive = 1;
  }
};

const mouseMove = (e) => {
  e.preventDefault();
  move = e.nativeEvent.offsetX;
};

const mouseUp = (e, id) => {
  e.target.style.cursor = "grab";
  // Перелистывание вправо
  if (start > move) {
    if (widthBlock === 672) {
      widthBlock = 0;
      dotActive = 0;
    } else {
      widthBlock += 224;
      dotActive += 1;
    }
    document.querySelectorAll(".cards__carousel-inner")[id - 1].style.transform = `translateX(-${widthBlock}px)`;
  }
  // Перелистывание влево
  if (move > start) {
    if (widthBlock === 0) {
      widthBlock = 672;
      dotActive = 3;
    } else {
      widthBlock -= 224;
      dotActive -= 1;
    }
    document.querySelectorAll(".cards__carousel-inner")[id - 1].style.transform = `translateX(-${widthBlock}px)`;
  }
  // Делаем точку активной
  dotActiveAdd(id);
};

export { mouseStart, mouseMove, mouseUp, dotActiveRemove, dotChangeSlide };
