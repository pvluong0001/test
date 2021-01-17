import axios from 'axios';
import {history} from '../configureStore';

const api = axios.create({
  baseURL: 'http://localhost:8088',
});

api.interceptors.request.use(config => {
  if(localStorage.getItem('token')) {
    config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  return config;
})

api.interceptors.response.use(function(response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function(error) {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        localStorage.removeItem('token')
        history.push('/login')
        break;
    }
  }

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default api;