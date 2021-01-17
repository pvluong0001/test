import {SET_LOADING} from '@reducers/constants';

const initialState = false

export default function loading(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
}