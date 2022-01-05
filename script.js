'use strict';

// Selecting elements
let currentScore0El = document.getElementById('current--0');
let currentScore1El = document.getElementById('current--1');
const totalScore0El = document.getElementById('score--0');
const totalScore1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// startung conditions
totalScore0El.textContent = 0;
totalScore1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
const maxScore = 10;
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

const resetGame = isPlaying => {
  if (isPlaying) {
    scores[0] = 0;
    scores[1] = 0;
    playing = isPlaying;
    currentScore = 0;
    totalScore0El.textContent = scores[0];
    totalScore1El.textContent = scores[1];
    currentScore0El.textContent = currentScore;
    currentScore1El.textContent = currentScore;
  } else {
    playing = isPlaying;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
    diceEl.classList.add('hidden');
  }
};

// Rolling dice functionality
const rollDice = () => {
  if (playing) {
    let diceRoll = Number(Math.trunc(Math.random() * 6)) + 1;
    diceEl.src = `dice-${diceRoll}.png`;
    diceEl.classList.remove('hidden');
    if (diceRoll !== 1) {
      //   add dice to current score
      currentScore += diceRoll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
};

// Hold score functionality
const holdScore = () => {
  if (playing) {
    // Add current score to activated score
    scores[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;

    if (activePlayer === 0) {
      totalScore0El.textContent = scores[activePlayer];
      console.log(totalScore0El.textContent);
    } else {
      totalScore1El.textContent = scores[activePlayer];
      console.log(totalScore1El.textContent);
    }
    // Check if player's score is >= 100
    // finish the game
    if (scores[activePlayer] >= maxScore) {
      resetGame(false);
    } else {
      // switch to the next player
      switchPlayer();
    }
  }
};

const newGame = () => {
  // set player 1 to default
  if (scores[activePlayer] >= maxScore) {
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--winner');
    activePlayer = 0;
    if (activePlayer === 0) {
      player0El.classList.toggle('player--active');
    }

    // set all score to 0
    resetGame(true);
  }
  diceEl.classList.add('hidden');
};

// event listener handler
btnRoll.addEventListener('click', rollDice);
btnHold.addEventListener('click', holdScore);
btnNew.addEventListener('click', newGame);
