const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let [firstCard, ], secondCard;

// document.querySelectAll is set to all memory-card elements in order to flip cards when clicked.


function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  // the "this" variable representes the card that was clicked with the for each loop below. The function accessess the element's classList and toggles the flip class

  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }
  // can check for a match by checking for a card's dataset specified in HTML. with hasFlippedCard set to false and in case of a match, disableCards function is invoked to prevent further flipping
  secondCard = this;
  lockBoard = true;
  

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}


// declaring a lockBoard variable sets it so when a player clicks on a second card, with the lockBoard set to true and if(lockBoard) return; will prevent any card flipping before the cards are hidden or match
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

// firstCard and secondCard variables need to be reset after each round, so resetBoard() is set.
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// there is 12 cards in the game so we iterate through them and genereate a random number between 0 and 12 and assign it to a flex item order property

// to invoke the shuffle function, a Immediately Invoked Function Expression will execute itself right after its declaration.
(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

// the for each loops through each card, so everytime a card is clicked the flip function will be fired.
cards.forEach(card => card.addEventListener('click', flipCard));