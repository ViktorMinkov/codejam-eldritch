import difficulties from './data/difficulties.js'
import ancientsData from './data/ancients.js'
import * as Cards from './data/mythicCards/index.js'
// console.log(difficulties)
console.log(ancientsData)
console.log(Cards)

// const ancientsContainer = document.querySelector('.ancients__container')
const difficultyContainer = document.querySelector('.difficulty__container')
// const ancientsItem = document.querySelector('.ancients__item')
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

const cardsArray = new Array(...Cards.greenCards,...Cards.brownCards,...Cards.blueCards)
const fullDeckBlue = cardsArray.filter(card => card.color==='blue')
const fullDeckGreen = cardsArray.filter(card => card.color==='green')
const fullDeckBrown = cardsArray.filter(card => card.color==='brown')
const fullDeck = [fullDeckGreen,fullDeckBrown,fullDeckBlue]
console.log(fullDeck)


//Random function
function getRandomNum(num) {
  return Math.floor(Math.random() * num);
}
//Shuffle for decks
function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
  return array;  
}

function setActive (event) {    
    event.target.classList.add('active')   
}

window.addEventListener('click',(event) => {
    //Click on containers
    if (event.target.closest('.ancients__item')) {
        setActive(event)
        difficultyContainer.classList.add('visible')
    }
    if(event.target.closest('.difficulty')) {
        difficulty.forEach(el => el.classList.remove('active'))
        setActive(event)
        shuffleButton.classList.add('visible')
        statsBlock.classList.remove('visible')
        cardsBlock.classList.remove('visible')
    }
    if(event.target.closest('.shuffle-button')) {
      statsBlock.classList.add('visible')
      cardsBlock.classList.add('visible')
      shuffleButton.classList.remove('visible')

    } 
})


//Full algorithm
//sum all card from stage of Ancient
function sumAncientCards(firstStage,secondStage,thirdStage) {
  let sum = {};

  Object.keys(firstStage).forEach(key => {      
      sum[key] = firstStage[key] + secondStage[key] + thirdStage[key]     
  })   
  return sum;
}

console.log(ancientsData[0].firstStage.greenCards)
//Full deck from Ancient requirements
let fullPlayingDeck = []
function getFullCards (array) {   
  let numberOfCards = sumAncientCards(ancientsData[0].firstStage,ancientsData[0].secondStage,ancientsData[0].thirdStage)
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
  return result
}
fullPlayingDeck = getFullCards(fullDeck)

console.log(fullDeck)
console.log(fullPlayingDeck)
//get 3 deck from FullDeck
const greenDeck = fullPlayingDeck.filter(el => el.color === 'green')
const brownDeck = fullPlayingDeck.filter(el => el.color === 'brown')
const blueDeck = fullPlayingDeck.filter(el => el.color === 'blue')

console.log(greenDeck)
console.log(brownDeck)
console.log(blueDeck)
