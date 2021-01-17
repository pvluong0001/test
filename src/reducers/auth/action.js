import api from '@plugins/api';
import {history} from '../../configureStore';

export const loginHandle = payload => {
  return dispatch => {
    return api.post('/api/auth/signin', payload)
      .then(res => {
        localStorage.setItem('token', res.data.data.accessToken);

        dispatch({
          type: 'SET_USER',
          payload: res.data.data
        })

        history.push('/admin')
      })
  }
}

export const logout = () => {
  return dispatch => {
    localStorage.removeItem('token');

    dispatch({
      type: 'SET_USER',
      payload: null
    })

    history.push('/admin')
  }
}