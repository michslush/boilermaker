import React from 'react'
import {generateWinningNumber} from './gameHelpers'
import {SevenKingdoms} from './index'

export class Game extends React.Component {
  constructor() {
    super()
    this.state = {
      heading: 'When You Play The Game of Guessing, You Win Or You Die...',
      helper: 'Guess a number betwixt 1 and 100:',
      guesses: [],
      guess: '',
      validGuess: null,
      winningNumber: generateWinningNumber(),
      hints: [],
      sevenKingdoms: [
        'Dorne',
        'The Iron Islands',
        'The Stormlands',
        'The Reach',
        'The Vale',
        'The Westerlands',
        'The North'
      ],
      buttonClass: 'notGlowing'
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmitGuess = this.handleSubmitGuess.bind(this)
    this.validateGuess = this.validateGuess.bind(this)
    this.checkGuess = this.checkGuess.bind(this)
    this.guessMessage = this.guessMessage.bind(this)
    this.difference = this.difference.bind(this)
    this.isLower = this.isLower.bind(this)
    this.won = this.won.bind(this)
    this.newGame = this.newGame.bind(this)
    this.provideHint = this.provideHint.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmitGuess(evt) {
    evt.preventDefault()
    const guess = Number(this.state.guess)

    this.setState({
      guess: ''
    })

    this.validateGuess(guess)
    this.checkGuess()
    this.guessMessage()
  }

  validateGuess(guess) {
    if (guess < 1 || guess > 100 || typeof guess !== 'number') {
      this.setState({
        helper: 'That is an invalid guess!'
      })
    } else {
      this.setState({
        validGuess: guess
      })
    }
  }

  checkGuess() {
    const {validGuess, winningNumber, guesses, sevenKingdoms} = this.state

    if (validGuess === winningNumber && sevenKingdoms.length) {
      sevenKingdoms.shift()
    } else if (validGuess === winningNumber && !sevenKingdoms.length) {
      this.setState({
        heading:
          'You have conquered all Seven Kingdoms and now YOU sit on the Iron Throne.  I shall bend the knee!'
      })
    } else if (guesses.includes(validGuess)) {
      this.setState({
        heading: `The three eyed raven says you've already guessed that number.`
      })
    } else {
      guesses.push(validGuess)
    }
  }

  difference() {
    const {validGuess, winningNumber} = this.state
    return Math.abs(validGuess - winningNumber)
  }

  isLower() {
    const {validGuess, winningNumber} = this.state
    if (validGuess < winningNumber) {
      return true
    } else {
      return false
    }
  }

  guessMessage() {
    const diff = this.difference()
    const {guesses} = this.state

    if (guesses.length === 5) {
      this.setState({
        heading: 'You know nothing, Jon Snow.',
        helper: 'Ser Ilyn, bring me his head!'
      })
    } else if (diff === 0) {
      this.setState({
        heading:
          'What do we say to the God of Death? Not today...You win this round!',
        buttonClass: 'glowing'
      })
    } else if (diff < 10) {
      this.setState({
        heading: `You must be a dragon with a guess that hot!`
      })
    } else if (diff < 25) {
      this.setState({
        heading: `Gods be good-you're getting closer!`
      })
    } else if (diff < 50) {
      this.setState({
        heading: `Winter is Coming, with a guess that cold...`
      })
    } else {
      this.setState({
        heading: `The butcher's boy had a better chance of surviving than that guess had of being correct.`
      })
    }

    if (this.isLower()) {
      this.setState({
        helper: 'Guess Higher!'
      })
    } else {
      this.setState({
        helper: 'Guess Lower!'
      })
    }
  }

  won() {
    const {validGuess, winningNumber} = this.state

    if (validGuess === winningNumber) {
      return true
    } else {
      return false
    }
  }

  newGame() {
    this.setState({
      helper: 'Guess a number betwixt 1 and 100:',
      hints: [],
      guesses: [],
      winningNumber: generateWinningNumber(),
      buttonClass: 'notGlowing'
    })

    return new Game()
  }

  provideHint() {
    let hint = [
      this.state.winningNumber,
      generateWinningNumber.call(this.newGame),
      generateWinningNumber.call(this.newGame)
    ]
    this.setState({
      hints: [hint]
    })
  }

  render() {
    const {heading, helper, guess, guesses, hints, sevenKingdoms} = this.state

    let previousGuesses = null
    let hintsDiv = null

    if (guesses.length) {
      previousGuesses = (
        <div id="guessesDiv">Previous Guesses: {guesses.join(' ')}</div>
      )
    }

    if (hints.length) {
      hintsDiv = <div id="hintsDiv">Hints: {this.state.hints.join(' ')}</div>
    }

    return (
      <div id="gameContainer">
        <div id="singleGame">
          <p id="heading">{heading}</p>
          <div id="submitGuess">
            <form onSubmit={this.handleSubmitGuess}>
              <label htmlFor="guess">{helper}</label>
              <input
                onChange={this.handleChange}
                name="guess"
                type="text"
                value={guess}
                autoFocus={true}
              />
              <button type="submit">Submit</button>
            </form>
          </div>
          <div id="previousGuesses">{previousGuesses}</div>
          <div id="otherButtons">
            <button onClick={this.provideHint} type="button">
              Get Hints
            </button>
            <button
              className={this.state.buttonClass}
              onClick={this.newGame}
              type="button"
            >
              Conquer Again
            </button>
          </div>
          {hintsDiv}
        </div>
        <div id="sevenKingdomsComponent">
          <SevenKingdoms sevenKingdoms={sevenKingdoms} />
        </div>
      </div>
    )
  }
}
