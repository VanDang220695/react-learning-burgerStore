import { put, delay, call } from 'redux-saga/effects';

import {
  signupService,
  signinService,
  sendEmailConfirmService,
  getInforUserService,
} from '../../services/auth';
import * as actions from '../actions';

export function* logout() {
  yield call([localStorage, 'removeItem'], 'token');
  yield call([localStorage, 'removeItem'], 'expirationDate');
  yield call([localStorage, 'removeItem'], 'userId');
  yield call([localStorage, 'removeItem'], 'email');
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
  let action = isSignUp ? signupService : signinService;

  let response;
  try {
    response = yield call(action, authData);
    const { idToken, localId, expiresIn } = response.data;
    const expirationDate = yield new Date(new Date().getTime() + Number(expiresIn) * 1000);

    // Verify email
    if (isSignUp) {
      yield call(sendEmailConfirmService, { requestType: 'VERIFY_EMAIL', idToken });
      yield put(actions.authSignup());
      return;
    }
    yield call(getInforUserService, {
      ...authData,
      idToken,
    });
    const { data: userInformation } = yield call(getInforUserService, {
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
    yield localStorage.setItem('email', email);
    yield put(actions.authSuccess(idToken, localId, email));
    yield put(actions.checkAuthTimeout(Number(expiresIn)));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* authCheckState() {
  const token = yield localStorage.getItem('token');
  const email = yield localStorage.getItem('email');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (expirationDate > new Date()) {
      const userId = localStorage.getItem('userId');
      yield put(actions.authSuccess(token, userId, email));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}
