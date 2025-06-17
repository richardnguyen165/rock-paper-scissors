

let humanScore = Number(localStorage.getItem('humanScore')) || 0;
let computerScore = Number(localStorage.getItem('computerScore')) || 0;

function getHumanChoice(){

  document.querySelector('.human-score').innerHTML = `Your Score: ${humanScore}`;
  document.querySelector('.computer-score').innerHTML = `Computer Score: ${computerScore}`;

  let userInput = prompt("Rock, Paper, or Scissors?");

  fixedInput = userInput.toLowerCase().trim();

  return fixedInput;
}


function getComputerChoice(){
  const randomNumber = Math.floor(Math.random() * 3);
  let computerChoice;

  if (randomNumber === 0){
    computerChoice = 'rock';  
  }
  else if (randomNumber === 1){
    computerChoice = 'paper';
  }
  else{
    computerChoice = 'scissors';
  }

  return computerChoice;
}

function playRound(playerMove, computerChoice){

  let finalMessage = `Your Move: ${playerMove[0].toUpperCase() + playerMove.slice(1)}. Computer Move: ${computerChoice[0].toUpperCase() + computerChoice.slice(1)}. Result: `;
  if (playerMove === computerChoice){
    finalMessage += 'Tie!';
  }
  else if ((playerMove === 'rock' && computerChoice === 'scissors') || (playerMove === 'scissors' && computerChoice === 'paper') || (playerMove === 'paper' && computerChoice === 'rock')){
    finalMessage += 'Win!';
    humanScore += 1;
  }
  else{
    finalMessage += 'Lost!';
    computerScore += 1;
  }

  document.querySelector('.human-score').innerHTML = `Your Score: ${humanScore}`;
  document.querySelector('.computer-score').innerHTML = `Computer Score: ${computerScore}`;

  localStorage.setItem('humanScore', JSON.stringify(humanScore));
  localStorage.setItem('computerScore', JSON.stringify(computerScore));

  console.log(finalMessage);
  console.log(`Your Score: ${humanScore}`);
  console.log(`Computer Score: ${computerScore}`);
  return;
}


function playGame(){
  for (let i = 0; i < 5; i++){
    playRound(getHumanChoice(), getComputerChoice());
  }
}

playGame();
