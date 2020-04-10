import { put, delay, call } from 'redux-saga/effects';
import { setCookie, deleteAllCookies, getCookie } from '../../utils/cookies';
import { COOKIE_EMAIL, COOKIE_TOKEN, COOKIE_USER_ID, EXPIRATION_DATE } from '../../constants/index';

import {
  signupService,
  signinService,
  sendEmailConfirmService,
  getInfoUserService,
} from '../../services/auth';
import * as actions from '../actions';

export function* logout() {
  yield call([localStorage, 'clear']);

  deleteAllCookies();
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeout(payload) {
  yield delay(payload.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUser({ payload }) {
  yield put(actions.authStart());
  const { email, password, isSignup } = payload;
  const authData = {
    email,
    password,
    returnSecureToken: true,
  };
  let action = isSignup ? signupService : signinService;

  let response;
  try {
    response = yield call(action, authData);
    const { idToken, localId, expiresIn } = response.data;
    const expirationDate = yield new Date(new Date().getTime() + Number(expiresIn) * 1000);

    // Verify email
    if (isSignup) {
      yield call(sendEmailConfirmService, { requestType: 'VERIFY_EMAIL', idToken });
      yield put(actions.authSignup());
      return;
    }
    const { data: userInformation } = yield call(getInfoUserService, {
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
    setCookie(COOKIE_TOKEN, idToken, 3600);
    setCookie(COOKIE_USER_ID, localId, 3600);
    setCookie(COOKIE_EMAIL, email, 3600);
    yield localStorage.setItem(EXPIRATION_DATE, expirationDate);
    yield put(actions.authSuccess({ token: idToken, userId: localId }));
    yield put(actions.checkAuthTimeout(Number(expiresIn)));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}

export function* authCheckState() {
  const token = yield getCookie(COOKIE_TOKEN);
  const userId = yield getCookie(COOKIE_USER_ID);
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = new Date(localStorage.getItem(EXPIRATION_DATE));
    if (expirationDate > new Date()) {
      yield put(actions.authSuccess({ token, userId }));
      yield put(actions.checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    } else {
      yield put(actions.logout());
    }
  }
}
