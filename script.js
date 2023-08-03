'use strict';

// Selecting elements
const score0El = document.getElementById('score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

let scores, currentScore, activePlayer, playing;


////////////////////////////////////////
//  D-ONT R-EPEAT Y-OURSELF solution  //
////////////////////////////////////////

const init = () => {

    [scores, currentScore, activePlayer, playing] = [[0, 0], 0, 0, true];
    [score0El.textContent, score1El.textContent ] = [0, 0];
    [current0El.textContent, current1El.textContent] = [0, 0];

    diceEl.classList.add('hidden')

    player0El.classList.remove('player--winner')
    player1El.classList.remove('player--winner')

    player0El.classList.add('player--active')
    player1El.classList.remove('player--active')
}

/////////////////////////////////////////////////
//  So that the starting conditions are set    //
//  and can proceed with the game.             //
//  If you don't run it at start, the buttons  //
//  will not work given that the there were no //
//  starting conditions.                       //
/////////////////////////////////////////////////

init()


///////////////////////////////////////////////
// Rolling a dice functionality              //
//                                           //
// User rolls dice                           //
//    - generate random dice roll            //
//   - display rice roll                     //
//    - is it a 1 ? switch player :          // 
//      add dice roll to the current score   //
//      and display new score                //
///////////////////////////////////////////////

const switchPlayer=() => {
    document
        .getElementById(`current--${activePlayer}`)
        .textContent = 0;
    
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    // toggles--if the class exists, it removes.
    // otherwise, it adds the missing class.
    player0El.classList.toggle('player--active')
    player1El.classList.toggle('player--active')
}

btnRoll.addEventListener('click', () => {
    if (playing) {
        // 1. Generate random dice roll
        let dice = Math.floor((Math.random() * 6) + 1)

        // 2. Display dice
        diceEl.classList.remove('hidden')
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1: if true, switch to next player
        // have something to do with the css
        if (dice !== 1) {
            currentScore += dice;
            // keeping track of the current score of the active player
            document
                .getElementById(`current--${activePlayer}`)
                .textContent = currentScore;
        } else {
            switchPlayer()
        }
    }
});

btnHold.addEventListener('click', () => {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`)
    .textContent = scores[activePlayer];

    if (scores[activePlayer] >= 100) {
        playing = false;
        diceEl.classList.add('hidden')

        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner')
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.remove('player--active')
    } else { 
        switchPlayer()
    }
})

btnNew.addEventListener('click', () => init())
