import axios from 'axios';

import * as actionTypes from './actionTypes';

const API_KEY = 'AIzaSyC1JYOQTBx7_t3ozgiT8ILbMEHQRL8Qgzw';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId,
  };
};

export const authFailed = error => {
  return {
    type: actionTypes.AUTH_FAILDED,
    error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
    if (!isSignUp) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
    }
    axios
      .post(url, authData)
      .then(res => {
        const { idToken, localId, expiresIn } = res.data;
        const expirationDate = new Date(new Date().getTime() + Number(expiresIn) * 1000);
        localStorage.setItem('token', idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', localId);
        dispatch(authSuccess(idToken, localId));
        dispatch(checkAuthTimeout(Number(expiresIn)));
      })
      .catch(err => dispatch(authFailed(err.response.data.error)));
  };
};

export const setAuthRedirectPath = path => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path,
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
      } else {
        dispatch(logout());
      }
    }
  };
};
