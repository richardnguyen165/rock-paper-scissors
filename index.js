

let humanScore = Number(localStorage.getItem('humanScore')) || 0;
let computerScore = Number(localStorage.getItem('computerScore')) || 0;
// stringify before you parse
let tieScore = Number(localStorage.getItem('tieScore')) || 0;
let results = JSON.parse(localStorage.getItem('previousPlayed')) || [];

document.querySelector('.human-score').innerText = `Your Score: ${humanScore}`;
document.querySelector('.tie-score').innerText = `Tie Score: ${tieScore}`;
document.querySelector('.computer-score').innerText = `Computer Score: ${computerScore}`;

const buttonContainerReference = document.querySelector('.button-container');

generateTable();

buttonContainerReference.addEventListener('click', (event) => {
  // Since we have clicked a button inside the container -> event.target alows us to identify what button was pressed
  const buttonChosen = event.target;
  const whichChoice = buttonChosen.className;
  if (whichChoice === 'rock'){
    playRound('rock', getComputerChoice());
  }
  else if (whichChoice === 'paper'){
    playRound('paper', getComputerChoice());
  }
  else{
    playRound('scissors', getComputerChoice());
  }
})

function getComputerChoice(){
  const randomNumber = Math.random();
  let computerChoice;

  if (0 <= randomNumber && randomNumber < 1/3){
    computerChoice = 'rock';  
  }
  else if (1/3 <= randomNumber && randomNumber < 2/3){
    computerChoice = 'paper';
  }
  else{
    computerChoice = 'scissors';
  }

  return computerChoice;
}

function playRound(playerMove, computerChoice){

  let finalMessage = `Your Move: ${playerMove[0].toUpperCase() + playerMove.slice(1)}. Computer Move: ${computerChoice[0].toUpperCase() + computerChoice.slice(1)}. Result: `;
  let resultIndicator;
  if (playerMove === computerChoice){
    finalMessage += 'Tie!';
    tieScore += 1;
    resultIndicator = 'Tie';
  }
  else if ((playerMove === 'rock' && computerChoice === 'scissors') || (playerMove === 'scissors' && computerChoice === 'paper') || (playerMove === 'paper' && computerChoice === 'rock')){
    finalMessage += 'Win!';
    humanScore += 1;
    resultIndicator = 'Win';
  }
  else{
    finalMessage += 'Lost!';
    computerScore += 1;
    resultIndicator = 'Lost';
  }

  if (document.querySelector('.final-message')){
    // removes previous message
    const finalMessageRemove = document.querySelector('.final-message');
    finalMessageRemove.remove();
  }

  document.querySelector('.human-score').innerText = `Your Score: ${humanScore}`;
  document.querySelector('.tie-score').innerText = `Tie Score: ${tieScore}`;
  document.querySelector('.computer-score').innerText = `Computer Score: ${computerScore}`;
  const finalMessageDisplay = document.createElement('p');
  finalMessageDisplay.innerText = (finalMessage);
  finalMessageDisplay.classList.add('final-message');
  const resultsReference = document.querySelector('.current-game-container')
  resultsReference.appendChild(finalMessageDisplay);

  const resultObject = {
    playerMove,
    computerChoice,
    resultIndicator
  };

  console.log(resultObject);
  results.push(resultObject);

  localStorage.setItem('humanScore', JSON.stringify(humanScore));
  localStorage.setItem('computerScore', JSON.stringify(computerScore));
  localStorage.setItem('previousPlayed', JSON.stringify(results));
  localStorage.setItem('tieScore', JSON.stringify(tieScore));

  console.log(finalMessage);
  console.log(`Your Score: ${humanScore}`);
  console.log(`Tie Score: ${tieScore}`);
  console.log(`Computer Score: ${computerScore}`);
  generateTable();
  return;
}

// Reset button

function resetScore(){
  if (confirm('Do you want to reset your score?')){
    humanScore = 0;
    computerScore = 0;
    results = [];
    tieScore = 0;
    
    localStorage.setItem('humanScore', JSON.stringify(humanScore));
    localStorage.setItem('computerScore', JSON.stringify(computerScore));
    localStorage.setItem('tieScore', JSON.stringify(tieScore));
    localStorage.setItem('previousPlayed', JSON.stringify(results));

    document.querySelector('.human-score').innerText = `Your Score: ${humanScore}`;
    document.querySelector('.tie-score').innerText = `Tie Score: ${tieScore}`;
    document.querySelector('.computer-score').innerText = `Computer Score: ${computerScore}`;

    if (document.querySelector('.final-message')){
      const finalMessageRemove = document.querySelector('.final-message');
      finalMessageRemove.remove();
    }

    generateTable();
  }
};

const resetReference = document.querySelector('.reset');

resetReference.addEventListener('click', resetScore);

document.addEventListener('keydown', (event) => {
  if (event.key === 'r'){
    resetScore();
  }
})

// Score table

function generateTable(){
  console.log(results);
  let tableHTML = `
  <div class = "result-seperate-container">
    <div class = "category-container">
      <strong>Game Number</strong>
    </div>
    <div class = "category-container"> 
      <strong>Player Move</strong>
    </div>
    <div class = "category-container">
      <strong>Computer Move</strong>
    </div>
    <div class = "category-container">
      <strong>Result</strong>
    </div>
  </div>`;
  for(let i = results.length - 1; i >= 0; i--){
    let info = results[i];
    tableHTML += 
    `<div class = "result-seperate-container">
      <div class = "category-container">
        #${i + 1}
      </div>
      <div class = "category-container"> 
        ${info.playerMove.charAt(0).toUpperCase() + info.playerMove.slice(1)}
      </div>
      <div class = "category-container">
        ${info.computerChoice.charAt(0).toUpperCase() + info.computerChoice.slice(1)}
      </div>
      <div class = "category-container">
        ${info.resultIndicator}
      </div>
    </div>`
  }
  let resultContainerReference = document.querySelector('.result-container');
  resultContainerReference.innerHTML = tableHTML;

}

// CSV Button

function exportToCSV(){
  // https://stackoverflow.com/questions/14964035/how-to-export-javascript-array-info-to-csv-on-client-side
  let csvFormatted = "data:text/csv;charset=utf-8,";
  csvFormatted += "Game Number,Player Move,Computer Move,Result\r\n"
  for(let i = results.length - 1; i >= 0; i--){
    let item = results[i];
    csvFormatted += `${i + 1},${info.playerMove.charAt(0).toUpperCase() + info.playerMove.slice(1)},${info.computerChoice.charAt(0).toUpperCase() + info.computerChoice.slice(1)},${item.resultIndicator}\r\n`;
  }

  var encodedUri = encodeURI(csvFormatted);
  window.open(encodedUri);
}

const csvReference = document.querySelector('.csv');
csvReference.addEventListener('click', exportToCSV);
