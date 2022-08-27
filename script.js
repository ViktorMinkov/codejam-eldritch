import difficulties from './data/difficulties.js'
import ancientsData from './data/ancients.js'
import * as Cards from './data/mythicCards/index.js'
// console.log(difficulties)
console.log(ancientsData)
console.log(Cards)

// const ancientsContainer = document.querySelector('.ancients__container')
const difficultyContainer = document.querySelector('.difficulty__container')
const ancientsItem = document.querySelector('.ancients__item')
const difficulty = document.querySelectorAll('.difficulty')
const greenСircles = document.querySelectorAll('.green')
const brownСircles = document.querySelectorAll('.brown')
const blueСircles = document.querySelectorAll('.blue')
const statsBlock = document.querySelector('.stage-stats')
const statsItem = document.querySelectorAll('.stats__item')
const shuffleButton = document.querySelector('.shuffle-button')
const cardsBlock = document.querySelector('.cards-area')
const deck = document.querySelector('.deck')
const lastCard = document.querySelector('.last-card')

//Копия массива карт
const cardsArray = new Array(...Cards.greenCards,...Cards.brownCards,...Cards.blueCards)
// const allCardsBlue = cardsArray.filter(card => card.color==='blue')
// const allCardsGreen = cardsArray.filter(card => card.color==='green')
// const allCardsBrown = cardsArray.filter(card => card.color==='brown')
// const fullCards = [allCardsGreen,allCardsBrown,allCardsBlue]
//Копия свойств древних
const ancientsDataCopy = []
ancientsData.forEach(el => ancientsDataCopy.push(el))
console.log(ancientsDataCopy)
//сделать функцию,чтобы при кликее на древнего он считывал его айди и возвращал нажатого древнего
let matrix = [
  [0,0,0],
  [0,0,0],
  [0,0,0]
 ]
 let fullCards =[]
 let fullPlayingCards = []
 let filteredCardsByColor =[]
 let firstStageDeck = []
 let secondStageDeck = []
 let thirdStageDeck = []
 const finalDeck = []


//random number
function getRandomNum(num) {
  return Math.floor(Math.random() * num);
}
//Shuffle for decks
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;  
}

const ancientsStagesArray = ancientsDataCopy.forEach((el) => { 
   })




//массив всех карт разбитый по цветам
function getArrayByColors (array) {
  let allCardsBlue = array.filter(card => card.color==='blue')
  let allCardsGreen = array.filter(card => card.color==='green')
  let allCardsBrown = array.filter(card => card.color==='brown')
  let fullCards = [allCardsGreen,allCardsBrown,allCardsBlue]
  return fullCards;
}
  

 
 //Сумма карт всех этапов древнего
  function sumCardsForAncient(firstStage,secondStage,thirdStage) {
    let sum = {};
  
    Object.keys(firstStage).forEach(key => {      
        sum[key] = firstStage[key] + secondStage[key] + thirdStage[key]     
    })   
    return sum;
  }
//нужное кол-во карт по условиям древнего
  function getCardsForDeck (array) {   
    let numberOfCards = sumCardsForAncient(ancientsData[0].firstStage,ancientsData[0].secondStage,ancientsData[0].thirdStage)//!додумать смену древнего
    console.log(numberOfCards)
    let result = []
    for (let i = 0; i < numberOfCards.greenCards;i++) {   
      let num = array[0].length;
      let removedCard = array[0].splice(getRandomNum(num),1)    
      result.push(...removedCard)  
    }
    for (let i = 0; i < numberOfCards.brownCards;i++) {
      let num = array[1].length;
      let removedCard = array[1].splice(getRandomNum(num),1)    
      result.push(...removedCard)   
    }
    for (let i = 0; i < numberOfCards.blueCards;i++) {
      let num = array[2].length;
      let removedCard = array[2].splice(getRandomNum(num),1)    
      result.push(...removedCard) 
    }
    return result;
  }
//Фильтр по цветам
function filterCardsByColor(array) {
    let green = array.filter(el => el.color === 'green')
    let brown = array.filter(el => el.color === 'brown')
    let blue = array.filter(el => el.color === 'blue')
    return [green,brown,blue]
 }
//Разбивка карт по этапам древнего
function filterCardsForStages (obj) {
    let result = [] 
    for (let i =0; i< obj.greenCards;i++) {
      let num = filteredCardsByColor[0].length;
      let removedCard = filteredCardsByColor[0].splice(getRandomNum(num),1)
      result.push(...removedCard)
    }
    for (let i =0; i< obj.blueCards;i++) {
      let num = filteredCardsByColor[2].length;
      let removedCard = filteredCardsByColor[2].splice(getRandomNum(num),1)
      result.push(...removedCard)    
    } 
    for (let i =0; i< obj.brownCards;i++) {
      let num = filteredCardsByColor[1].length;
      let removedCard = filteredCardsByColor[1].splice(getRandomNum(num),1)
      result.push(...removedCard)    
    }
    return result;
  }
  console.log(ancientsData[0].firstStage) 

//Выкладка карт из колоды
function getCardfromDeck () {
  let index = 0;
  if(index < finalDeck.length){
    let removedCard = finalDeck.pop()    
    lastCard.style.backgroundImage = `url(${removedCard.cardFace})`
    index ++;    
  }
  if(finalDeck.length === 0) {
    lastCard.classList.add('blackout')
  }
}
deck.addEventListener('click',getCardfromDeck)//Добавить привент дефолт наверное для того что бы не выделяллся при клике текст синим 

 //Listeners for blocks
 ancientsItem.addEventListener('click',() => {
  ancientsItem.classList.add('active') 
  difficultyContainer.classList.add('visible')         
})


difficultyContainer.addEventListener('click', event => {
if(event.target.closest('.difficulty')) {
  difficulty.forEach(el => el.classList.remove('active'))
  event.target.classList.add('active')
  shuffleButton.classList.add('visible')
  statsBlock.classList.remove('visible')
  cardsBlock.classList.remove('visible')
  //при клике на сложность формирую 3 колоды по цветам
  fullCards = getArrayByColors(cardsArray)
  console.log(fullCards)
}   
})

shuffleButton.addEventListener('click',() => {
  statsBlock.classList.add('visible')
  cardsBlock.classList.add('visible')
  shuffleButton.classList.remove('visible')
  lastCard.classList.remove('blackout')


  fullPlayingCards = getCardsForDeck(fullCards)
  // console.log(fullPlayingCards)
  filteredCardsByColor = filterCardsByColor(fullPlayingCards)
  // console.log(filteredCardsByColor)
  firstStageDeck = shuffle(filterCardsForStages(ancientsData[0].firstStage))
  secondStageDeck = shuffle(filterCardsForStages(ancientsData[0].secondStage))
  thirdStageDeck = shuffle(filterCardsForStages(ancientsData[0].thirdStage))

  finalDeck.length = 0
  finalDeck.push(...thirdStageDeck,...secondStageDeck,...firstStageDeck)
  console.log(finalDeck)
})