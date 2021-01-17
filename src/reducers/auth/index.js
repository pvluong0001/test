const initialState = {
  currentUser: {}
}

export default function auth(state = initialState, action) {
  switch (action.type) {
    case 'SET_USER':
      return {...state, currentUser: action.payload}
    default:
      return state;
  }
}