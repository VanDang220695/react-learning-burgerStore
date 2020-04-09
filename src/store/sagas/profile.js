import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { getProfileUser, updateProfile } from '../../services/profiles';

export function* getProfile() {
  try {
    yield put(actions.getProfileStart());

    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');
    const response = yield call(getProfileUser, {
      token,
      userId,
    });
    let dataFromResponse = {};
    if (response && response.data) {
      dataFromResponse = response.data;
    }

    yield put(actions.getProfileSuccess(dataFromResponse));
  } catch (error) {
    yield put(actions.getProfileFailed(error.response.error));
  }
}

export function* updateProfileUser({ payload }) {
  try {
    const token = yield localStorage.getItem('token');
    const userId = yield localStorage.getItem('userId');
    yield put(actions.getProfileStart());
    yield call(updateProfile, { payload, token, userId });
    yield put(actions.getProfile({ token, userId }));
    yield put(actions.setErrorProfileUpdate(false));
  } catch (error) {
    yield put(actions.setErrorProfileUpdate(true));
  }
}
