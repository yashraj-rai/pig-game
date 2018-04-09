/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, prevDice, winScore;

init();

//dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#current-' + activePlayer).textContent = dice;

//var x = document.querySelector('#score-' + activePlayer).textContent;
//console.log(x);

document.querySelector('.btn-roll').addEventListener('click', function(){
  if (gamePlaying){
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    var diceDOM1 = document.querySelector('#dice-0');
    var diceDOM2 = document.querySelector('#dice-1');
    diceDOM1.style.display = 'block';
    diceDOM2.style.display = 'block';
    diceDOM1.src = 'dice-' + dice1 + '.png';
    diceDOM2.src = 'dice-' + dice2 + '.png';

    if (dice1 !== 1 && dice2 !== 1) {
      roundScore += (dice1 + dice2);
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
    else {
      nextPlayer();
    }


    /*if (dice === 6 && prevDice === 6) {
      scores[activePlayer] = 0;
      document.querySelector('#score-' + activePlayer).textContent = 0;
      nextPlayer();
    }
    else if (dice1 !== 1 && dice2 !== 1) {
      roundScore += (dice1 + dice2);
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
      (dice1 === 6) ? prevDice = dice1 : prevDice = dice2;
    }
    else {
      nextPlayer();
    }*/
  }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    var input = document.querySelector('.final-score').value;
    if (input) {
      winScore = input;
    }
    else {
      winScore = 100;
    }
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= winScore){
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('#dice-0').style.display = 'none';
      document.querySelector('#dice-1').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    }
    else {
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;

  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('#dice-0').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init(){
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;
  prevDice = 1;

  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;

  document.querySelector('#dice-0').style.display = 'none';
  document.querySelector('#dice-1').style.display = 'none';

  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';

  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}
