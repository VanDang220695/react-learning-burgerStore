import { put, delay, call } from 'redux-saga/effects';

import configAxios from '../../utils/axios-orders';

import * as actions from '../actions';

const axios = configAxios(true);

const API_KEY = 'AIzaSyC1JYOQTBx7_t3ozgiT8ILbMEHQRL8Qgzw';

export function* logout() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeout(payload) {
  yield delay(payload.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUser({ payload }) {
  yield put(actions.authStart());
  const { email, password, isSignUp } = payload;
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let url = `accounts:signUp?key=${API_KEY}`;
  if (!isSignUp) {
    url = `accounts:signInWithPassword?key=${API_KEY}`;
  }
  let response;
  try {
    response = yield axios.post(url, authData);
    const { idToken, localId, expiresIn } = response.data;
    const expirationDate = yield new Date(new Date().getTime() + Number(expiresIn) * 1000);

    // Verify email
    if (isSignUp) {
      yield axios.post(`accounts:sendOobCode?key=${API_KEY}`, {
        requestType: 'VERIFY_EMAIL',
        idToken,
      });
      yield put(actions.authSignup());
      return;
    }
    const { data: userInformation } = yield axios.post(`accounts:update?key=${API_KEY}`, {
      ...authData,
      idToken,
    });

    if (!userInformation.emailVerified) {
      yield put(
        actions.authFailed({
          message: 'Your email not verify',
        }),
      );
      return;
    }
    yield localStorage.setItem('token', idToken);
    yield localStorage.setItem('expirationDate', expirationDate);
    yield localStorage.setItem('userId', localId);
    yield put(actions.authSuccess(idToken, localId));
    yield put(actions.checkAuthTimeout(Number(expiresIn)));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* authCheckState() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}
