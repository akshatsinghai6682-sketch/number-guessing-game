let randomnumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#subt');
const guessslot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastresult');
const userInput = document.querySelector('#guess-field');
const loworHi = document.querySelector('.lowOrHi');
const startover = document.querySelector('.results');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;


submit.addEventListener('click', function (e) {
  e.preventDefault();

  if (playGame) {
    let guess = parseInt(userInput.value);
    validateGuess(guess);
  }
});


function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  }
  else if (guess < 1) {
    alert('Please enter a number greater than 0');
  }
  else if (guess > 100) {
    alert('Please enter a number less than or equal to 100');
  }
  else {
    prevGuess.push(guess);

    if (numGuess > 10) {
      displayGuess(guess);
      displaymessage(`Game over. Random number was ${randomnumber}`);
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
    displaymessage('Congrats! You guessed it right');
    endGame();
  }
  else if (guess > randomnumber) {
    displaymessage(' Your guess is too high');
  }
  else {
    displaymessage(' Your guess is too low');
  }
}


function displayGuess(guess) {
  userInput.value = '';
  guessslot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess}`;
}


function displaymessage(message) {
  loworHi.innerHTML = `<h2>${message}</h2>`;
}


function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', true);
  playGame = false;

  p.innerHTML = `<h2 id="newgame">Start New Game</h2>`;
  startover.appendChild(p);

  newGame();
}

function newGame() {
  const startnew = document.querySelector('#newgame');
  startnew.style.boxShadow='0 0 10px black';
  startnew.addEventListener('click', function () {
    randomnumber = Math.floor(Math.random() * 100) + 1;
    numGuess = 1;
    prevGuess = [];
    guessslot.innerHTML = '';
    remaining.innerHTML = '10';
    loworHi.innerHTML = '';
    startover.removeChild(p);
    userInput.removeAttribute('disabled');
    playGame = true;
  });
}

  
