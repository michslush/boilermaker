export const generateWinningNumber = () => {
  return Math.floor(Math.random() * 100) + 1
}

export const shuffle = arr => {
  let len = arr.length
  let idx
  let temp
  // while there remain elements to shuffle...
  while (len) {
    // pick a remaining element...
    idx = Math.floor(Math.random() * len--)

    // and swap it with the current element
    temp = arr[len]
    arr[len] = arr[idx]
    arr[idx] = temp
  }

  return arr
}

// export const playGame = () => {
//   let winCount = 0
//   let game = newGame() // creates a new game using the newGame func
//   const inputGuess = document.querySelector('input') // input
//   const submitButton = document.getElementById('submit-guess-btn') // grabs the submit button from html
//   const hintBtn = document.getElementById('hint-btn') // when the hint button is clicked...
//   const playAgain = document.getElementById('play-again') // when the Play Again button is click...

//   // gets the guess and updates the game and guesses
//   function getInputAndUpdate(inputGuess) {
//     const guess = parseInt(inputGuess.value) // gets the guess and converts to num
//     inputGuess.value = '' // resets the guess input

//     game.playersGuessSubmission(guess) // checks the input-guess and returns a message about the guess

//     // give it the cursor
//     inputGuess.focus()
//   }

//   // when the submit button is clicked...
//   submitButton.addEventListener('click', function() {
//     getInputAndUpdate(inputGuess)
//   })

//   // when the enter key is pressed...
//   inputGuess.addEventListener('keyup', function(event) {
//     if (event.keyCode === 13) {
//       getInputAndUpdate(inputGuess)
//     }

//     // to count the wins
//     if (game.won()) {
//       winCount++
//       console.log('win')
//       document.getElementById(`kingdom-${winCount}`).innerHTML = 'CONQUERED'
//       document.getElementById(`kingdom-${winCount}`).style.color = 'green'
//     }
//   })

//   // when the hint button is clicked...
//   hintBtn.addEventListener('click', function() {
//     document.getElementById('hints').innerHTML = game.provideHint()
//     document.getElementById('message').innerHTML = 'I drink and I know things.'
//     inputGuess.focus()
//   })

//   // when the play again button is clicked...
//   playAgain.addEventListener('click', function() {
//     for (let i = 1; i <= winCount; i++) {
//       document.getElementById(`kingdom-${winCount}`).innerHTML = 'CONQUERED'
//       document.getElementById(`kingdom-${winCount}`).style.color = 'green'
//     }

//     game = newGame()

//     //document.querySelector('#guess-list > li').innerHTML = '-';
//   })
// }
