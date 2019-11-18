import axios from 'axios'
import {CLEAR_ERROR, LOGIN_ERROR, LOGOUT_USER, SET_USER} from "./actionType";
import js_cookie from 'js-cookie'

export const loginUser = loginData => async dispatch => {
  try{
    const res = await axios.post('/api/users/login', loginData);
    dispatch({
      type: SET_USER,
      user: res.data.user
    })
  }catch (e) {
    dispatch({
      type: LOGIN_ERROR,
      error: e.response.data
    })
  }
};

export const registerUser = registerData => async dispatch => {
  try{
    const res = await axios.post('/api/users/register', registerData);
    dispatch({
      type: SET_USER,
      user: res.data.user
    })
  }catch (e) {
    dispatch({
      type: LOGIN_ERROR,
      error: e.response.data
    })
  }
};

export const logout = () => {
  js_cookie.remove('jwt');
  return{
    type: LOGOUT_USER
  }
};

export const setCurrentUser = user => {
  return{
    type: SET_USER,
    user
  }
};

export const clearError = () => {
  return{
    type: CLEAR_ERROR
  }
};