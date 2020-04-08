import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { getProfileUser, updateProfile } from '../../services/profiles';

export function* getProfile() {
  try {
    yield put(actions.getProfileStart());
    const response = yield call(getProfileUser, {});
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
    yield put(actions.getProfileStart());
    yield call(updateProfile, payload);
    yield put(actions.getProfile());
    yield put(actions.setErrorProfileUpdate(false));
  } catch (error) {
    yield put(actions.setErrorProfileUpdate(true));
  }
}
