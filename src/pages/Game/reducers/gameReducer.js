export const initialState = {
  player: -1,
  state: null,
  winner: null,
  playerOne: null,
  playerTwo: null,
  isLoading: true,
  gamePresent: false,
  boxId: null,
  errors: [],
  turn: null,
  isPlayWithAi: false,
}

export const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_STATE':
      return {
        ...state,
        state: action.payload, 
      }
    case 'SET_PLAYER_ONE':
      return {
        ...state,
        playerOne: {...action.payload}
      }
    case 'SET_PLAYER_TWO':
      return {
        ...state,
        playerTwo: action.payload
      }
    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload
      }
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'SET_GAME_PRESENT':
      return {
        ...state,
        gamePresent: action.payload
      }
    case 'SET_ERROR':
      return {
        ...state,
        errors: [...state.errors, ...action.payload]
      }
    case 'SET_BOX_ID':
      return {
        ...state,
        boxId: action.payload
      }
    case 'SET_PLAYER':
      return {
        ...state,
        player: action.payload
      }
    case 'UPDATE_TURN':
      return {
        ...state,
        turn: action.payload
      }
    case 'SET_PLAY_WITH_AI':
      return {
        ...state,
        isPlayWithAi: action.payload
      }
    default:
      return state
  }
}