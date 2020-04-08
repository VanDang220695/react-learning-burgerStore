import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { getProfileUser, updateProfile } from '../../services/profiles';

export function* getProfile() {
  try {
    yield put(actions.getProfileStart());
    const response = yield call(getProfileUser, {});
    const dataFetch = [];
    for (let key in response.data) {
      dataFetch.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.getProfileSuccess(dataFetch[0] || {}));
  } catch (error) {
    yield put(actions.getProfileFailed(error.response.error));
  }
}

export function* updateProfileUser({ payload }) {
  try {
    yield put(actions.getProfileStart());
    yield call(updateProfile, payload);
    yield put(actions.setErrorProfileUpdate(false));
  } catch (error) {
    yield put(actions.setErrorProfileUpdate(true));
  }
}
