import Game from '../components/game'

/**
 * ACTION TYPES
 */
const GET_KINGDOMS = 'GET_KINGDOMS'
const NEW_GAME = 'NEW_GAME'
const DEFEAT_KINGDOM = 'DEFEAT_KINGDOME'

/**
 * INITIAL STATE
 */
const sevenKingdoms = {
  TheNorth: true,
  TheVale: true,
  TheStormlands: true,
  TheReach: true,
  TheWesterlands: true,
  TheIronIslands: true,
  Dorne: true
}

const initialState = {
  sevenKingdoms,
  currentGame
}

/**
 * ACTION CREATORS
 */
const getKingdoms = kingdoms => ({
  type: GET_KINGDOMS,
  kingdoms
})

const newGame = {
  newGame: new Game()
}

const defeatKingdom = () => ({
  type: DEFEAT_KINGDOM
})

// THUNKs

/**
 * REDUCER
 */
export default function(state = sevenKingdoms, action) {
  switch (action.type) {
    case GET_KINGDOMS:
      return {...state, sevenKingdoms: action.kingdoms}
    case NEW_GAME:
      return {...state, currentGame: action.newGame}
    default:
      return state
  }
}
