import difficulties from './data/difficulties.js'
import ancientsData from './data/ancients.js'
import * as Cards from './data/mythicCards/index.js'
// console.log(difficulties)
console.log(ancientsData)
console.log(Cards)

const ancientsContainer = document.querySelector('.ancients__container')
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
    // if()
    // if(event.target.classList.contains('active')) {
    //   console.log('sdas')
    // }
})