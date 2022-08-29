import difficulties from "./data/difficulties.js";
import ancientsData from "./data/ancients.js";
import * as Cards from "./data/mythicCards/index.js";
// console.log(difficulties)
console.log(Cards);

const ancientsContainer = document.querySelector(".ancients__container");
const difficultyContainer = document.querySelector(".difficulty__container");
const ancientsItem = document.querySelectorAll(".ancients__item");
const difficulty = document.querySelectorAll(".difficulty");
const greenСircles = document.querySelectorAll(".green");
const brownСircles = document.querySelectorAll(".brown");
const blueСircles = document.querySelectorAll(".blue");
const statsBlock = document.querySelector(".stage-stats");
const statsItem = document.querySelectorAll(".stats__item");
const shuffleButton = document.querySelector(".shuffle-button");
const cardsBlock = document.querySelector(".cards-area");
const deck = document.querySelector(".deck");
const lastCard = document.querySelector(".last-card");

//Копия массива карт
const cardsArray = new Array(
  ...Cards.greenCards,
  ...Cards.brownCards,
  ...Cards.blueCards
);
//Копия свойств древних
const ancientsDataCopy = [...ancientsData];

console.log(ancientsDataCopy);

let fullCards = [];
let difficultyFilteredFullCards = [];
let numberOfCards = [];
let fullPlayingCards = [];
let filteredCardsByColor = [];
let firstStageDeck = [];
let secondStageDeck = [];
let thirdStageDeck = [];
let chosenAncient = [];
let stageCards = [];
const finalDeck = [];


//random number
function getRandomNum(num) {
  return Math.floor(Math.random() * num);
}
//Shuffle for decks
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;
}

function chooseAncient(event) {
  let result = "";
  if (event.target.id === "azathoth") {
    result = ancientsDataCopy[0];
  }
  if (event.target.id === "cthulhu") {
    result = ancientsDataCopy[1];
  }
  if (event.target.id === "iogSothoth") {
    result = ancientsDataCopy[2];
  }
  if (event.target.id === "shubNiggurath") {
    result = ancientsDataCopy[3];
  }
  return result;
}
//Выбор сложности
function filterByDifficulty(array, event) {
  let result = [];
  if (event.target.id === "easy") {
    result = array.map((el) => el.filter((card) => card.difficulty !== "hard"));
  }
  if (event.target.id === "normal") {
    result = array;
  }
  if (event.target.id === "hard") {
    result = array.map((el) => el.filter((card) => card.difficulty !== "easy"));
  }
  return result;
}

//массив всех карт разбитый по цветам
function getArrayByColors(array) {
  let allCardsBlue = array.filter((card) => card.color === "blue");
  let allCardsGreen = array.filter((card) => card.color === "green");
  let allCardsBrown = array.filter((card) => card.color === "brown");
  let fullCards = [allCardsGreen, allCardsBrown, allCardsBlue];
  return fullCards;
}

//Сумма карт всех этапов древнего
function sumCardsForAncient(firstStage, secondStage, thirdStage) {
  let sum = {};

  Object.keys(firstStage).forEach((key) => {
    sum[key] = firstStage[key] + secondStage[key] + thirdStage[key];
  });
  return sum;
}
//нужное кол-во карт по условиям древнего
function getCardsForDeck(array) {
  console.log(numberOfCards);
  let result = [];
  for (let i = 0; i < numberOfCards.greenCards; i++) {
    let num = array[0].length;
    let removedCard = array[0].splice(getRandomNum(num), 1);
    result.push(...removedCard);
  }
  for (let i = 0; i < numberOfCards.brownCards; i++) {
    let num = array[1].length;
    let removedCard = array[1].splice(getRandomNum(num), 1);
    result.push(...removedCard);
  }
  for (let i = 0; i < numberOfCards.blueCards; i++) {
    let num = array[2].length;
    let removedCard = array[2].splice(getRandomNum(num), 1);
    result.push(...removedCard);
  }
  return result;
}
//Фильтр по цветам
function filterCardsByColor(array) {
  let green = array.filter((el) => el.color === "green");
  let brown = array.filter((el) => el.color === "brown");
  let blue = array.filter((el) => el.color === "blue");
  return [green, brown, blue];
}
//Разбивка карт по этапам древнего
function filterCardsForStages(obj) {
  let result = [];
  for (let i = 0; i < obj.greenCards; i++) {
    let num = filteredCardsByColor[0].length;
    let removedCard = filteredCardsByColor[0].splice(getRandomNum(num), 1);
    result.push(...removedCard);
  }
  for (let i = 0; i < obj.blueCards; i++) {
    let num = filteredCardsByColor[2].length;
    let removedCard = filteredCardsByColor[2].splice(getRandomNum(num), 1);
    result.push(...removedCard);
  }
  for (let i = 0; i < obj.brownCards; i++) {
    let num = filteredCardsByColor[1].length;
    let removedCard = filteredCardsByColor[1].splice(getRandomNum(num), 1);
    result.push(...removedCard);
  }
  return result;
}

// Tracker
function tracker() {
  let index = 0;
  while (greenСircles[index].textContent === '0' && blueСircles[index].textContent === '0' && brownСircles[index].textContent === '0') {
    index++;    
    console.log(greenСircles[index].textContent)
  }
  if (removedCard.color === "green") {      
    greenСircles[index].textContent = Number(greenСircles[index].textContent) - 1;
  }
  if (removedCard.color === "blue") {    
    blueСircles[index].textContent = Number(blueСircles[index].textContent) - 1;
  }
  if (removedCard.color === "brown") {    
    brownСircles[index].textContent = Number(brownСircles[index].textContent) - 1;
  }   
}

//Listeners for blocks
ancientsContainer.addEventListener("click", (event) => {
  if (event.target.closest(".ancients__item")) {
    ancientsItem.forEach((el) => el.classList.remove("active"));
    event.target.classList.add("active");
    difficultyContainer.classList.add("visible");
    statsBlock.classList.remove("visible");
    cardsBlock.classList.remove("visible");

    chosenAncient = chooseAncient(event);
    stageCards = [
      chosenAncient.firstStage,
      chosenAncient.secondStage,
      chosenAncient.thirdStage,
    ];
  
    console.log(stageCards);
  
    stageCards.forEach((el, index) => {
      greenСircles[index].textContent = el.greenCards;      
      blueСircles[index].textContent = el.blueCards;
      brownСircles[index].textContent = el.brownCards;
    });
  }
});

difficultyContainer.addEventListener("click", (event) => {
  if (event.target.closest(".difficulty")) {
    difficulty.forEach((el) => el.classList.remove("active"));
    event.target.classList.add("active");
    shuffleButton.classList.add("visible");
    statsBlock.classList.remove("visible");
    cardsBlock.classList.remove("visible");

    //при клике на сложность формирую 3 колоды по цветам
    fullCards = getArrayByColors(cardsArray);
    //убрать карты по условиям сложности из fullСards
    difficultyFilteredFullCards = filterByDifficulty(fullCards, event);
    numberOfCards = sumCardsForAncient(
      chosenAncient.firstStage,
      chosenAncient.secondStage,
      chosenAncient.thirdStage
    );
    console.log(fullCards);
    console.log(difficultyFilteredFullCards);
    console.log(chosenAncient);
    stageCards.forEach((el, index) => {
      greenСircles[index].textContent = el.greenCards;      
      blueСircles[index].textContent = el.blueCards;
      brownСircles[index].textContent = el.brownCards;
    });
  }
});

shuffleButton.addEventListener("click", () => {
  statsBlock.classList.add("visible");
  cardsBlock.classList.add("visible");
  shuffleButton.classList.remove("visible");
  lastCard.classList.remove("blackout");
  lastCard.style.backgroundImage = `url()`

  fullPlayingCards = getCardsForDeck(difficultyFilteredFullCards);

  filteredCardsByColor = filterCardsByColor(fullPlayingCards);
  firstStageDeck = shuffle(filterCardsForStages(chosenAncient.firstStage));
  secondStageDeck = shuffle(filterCardsForStages(chosenAncient.secondStage));
  thirdStageDeck = shuffle(filterCardsForStages(chosenAncient.thirdStage));
  console.log(firstStageDeck);
  finalDeck.length = 0;
  finalDeck.push(...thirdStageDeck, ...secondStageDeck, ...firstStageDeck);
  console.log(finalDeck);
});

//Pull cards from final deck
let removedCard = {};
function pullCardFromDeck() {
  let index = 0;
  if (index < finalDeck.length) {
    removedCard = finalDeck.pop();
    lastCard.style.backgroundImage = `url(${removedCard.cardFace})`;
    index++;
    // console.log(removedCard);
    tracker();
  }
  if (finalDeck.length === 0) {
    lastCard.classList.add("blackout");
  }
}
deck.addEventListener("click", pullCardFromDeck);