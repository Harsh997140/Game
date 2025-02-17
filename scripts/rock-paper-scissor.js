let score = JSON.parse(localStorage.getItem('score')) || {
  wins : 0,
  loss : 0,
  tie : 0
};

updateScore();

let isAutoPlaying = false;
let intervalId;


document.querySelector('.js-auto')
  .addEventListener('click', () => {
    autoPlay();
  })

document.querySelector('.js-rock')
  .addEventListener('click', () => {
    userPlay('rock');
  });

document.querySelector('.js-paper')
  .addEventListener('click', () => {
    userPlay('paper');
  });

document.querySelector('.js-scissor')
  .addEventListener('click', () => {
    userPlay('scissor');
  });

document.querySelector('.js-leave') 
  .addEventListener('click', () => {
    resetScore();
  })

document.body.addEventListener('keydown', (event) => {

  if (event.key === 'r') {
    userPlay('rock');
  } else if (event.key === 'p') {
    userPlay('paper');
  } else if (event.key === 's') {
    userPlay('scissor');
  } else if (event.key === ' ') {
    autoPlay();
  } else if (event.key === 'q') {
    resetScore();
  }

});

function autoPlay () {

  if (!isAutoPlaying) {

    intervalId = setInterval ( () => {
      const move = pickComputerMove();
      userPlay(move);
    }, 1200);
    isAutoPlaying = true;
  } else {

    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

function userPlay (move) {

  const computerMove = pickComputerMove();
  let result = '';

  if (move === 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie';
    } else if (computerMove === 'paper') {
      result = 'You Loss';
    } else if (computerMove === 'scissor') {
      result = 'You Win';
    }

  } else if (move === 'paper') {
    if (computerMove === 'rock') {
      result = 'You Win';
    } else if (computerMove === 'paper') {
      result = 'Tie';
    } else if (computerMove === 'scissor') {
      result = 'You Loss';
    }

  } else if (move === 'scissor') {
    if (computerMove === 'rock') {
      result = 'You Loss';
    } else if (computerMove === 'paper') {
      result = 'You Win';
    } else if (computerMove === 'scissor') {
      result = 'Tie'
    }
  }

  if (result === 'You Win') {
    score.wins += 1;
  } else if (result === 'You Loss') {
    score.loss += 1;
  } else if (result === 'Tie') {
    score.tie += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));

  updateScore();

  document.querySelector('.result-dec').innerHTML = result;

  document.querySelector('.move-dec').innerHTML = `You <img src="images/${move}.png" class="move-icon">
  <img src="images/${computerMove}.png" class="move-icon1"> Computer`;
}

function updateScore () {
  document.querySelector('.score-dec')
    .innerHTML = `Wins: ${score.wins}, Losses: ${score.loss}, Ties: ${score.tie}`;
}

function resetScore () {
  score.wins = 0;
  score.loss = 0;
  score.tie = 0;

  localStorage.removeItem('score');
  updateScore();
}

function pickComputerMove () {

  const randomNumber = Math.random();
  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1/3 ) {
    computerMove = 'rock';
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber < 1){
    computerMove = 'scissor';
  }

  return computerMove;
}