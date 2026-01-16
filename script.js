
let randomnumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#subt');
const guessslot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastresult');
const userInput = document.querySelector('#guess-field');
const loworHi = document.querySelector('.lowOrHi');
const results = document.querySelector('.results');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

submit.addEventListener('click', function (e) {
  e.preventDefault();
  if (!playGame) return;

  const guess = Number(userInput.value);
  validateGuess(guess);
});

function validateGuess(guess) {
  if (isNaN(guess) || guess === 0) {
    displayMessage("Please enter a valid number");
  } 
  else if (guess < 1 || guess > 100) {
    displayMessage("Number must be between 1 and 100");
  } 
  else {
    prevGuess.push(guess);

    if (numGuess > 10) {
      displayGuess(guess);
      displayMessage(`Game Over! Number was ${randomnumber}`);
      endGame();
    } 
    else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomnumber) {
    displayMessage("You guessed it right!");
    endGame();
  } 
  else if (guess > randomnumber) {
    displayMessage("Your guess is too high");
  } 
  else {
    displayMessage("Your guess is too low");
  }
}

function displayGuess(guess) {
  userInput.value = "";
  guessslot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}

function displayMessage(message) {
  loworHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.disabled = true;
  playGame = false;

  const p = document.createElement('p');
  p.innerHTML = `<button id="newgame">Start New Game</button>`;
  results.appendChild(p);

  document.querySelector('#newgame').addEventListener('click', function () {
    randomnumber = Math.floor(Math.random() * 100) + 1;
    prevGuess = [];
    numGuess = 1;
    guessslot.innerHTML = "";
    remaining.innerHTML = "10";
    loworHi.innerHTML = "";
    userInput.disabled = false;
    playGame = true;
    results.removeChild(p);
  });
}