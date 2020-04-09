import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { getProfileUser, updateProfile } from '../../services/profiles';
import { getCookie } from '../../utils/cookies';
import { COOKIE_USERID, COOKIE_TOKEN, COOKIE_EMAIL } from '../../constants';

export function* getProfile() {
  try {
    const email = getCookie(COOKIE_EMAIL);
    yield put(actions.getProfileStart());
    const token = yield getCookie(COOKIE_TOKEN);
    const userId = yield getCookie(COOKIE_USERID);
    const response = yield call(getProfileUser, {
      token,
      userId,
    });
    let dataFromResponse = {};
    if (response && response.data) {
      dataFromResponse = response.data;
    }
    if (!dataFromResponse.email) {
      dataFromResponse.email = email;
    }

    yield put(actions.getProfileSuccess(dataFromResponse));
  } catch (error) {
    yield put(actions.getProfileFailed(error.response.error));
  }
}

export function* updateProfileUser({ payload }) {
  try {
    const token = yield getCookie(COOKIE_TOKEN);
    const userId = yield getCookie(COOKIE_USERID);
    yield put(actions.getProfileStart());
    yield call(updateProfile, { ...payload, token, userId });
    yield put(actions.getProfile({ token, userId }));
    yield put(actions.setErrorProfileUpdate(false));
  } catch (error) {
    yield put(actions.setErrorProfileUpdate(true));
  }
}
