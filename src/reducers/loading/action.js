import {SET_LOADING} from '@reducers/constants';

export function setLoading() {
  return {
    type: SET_LOADING,
    payload: true
  }
}

export function removeLoading() {
  return {
    type: SET_LOADING,
    payload: false
  }
}