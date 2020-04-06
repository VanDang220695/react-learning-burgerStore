import { call, put } from 'redux-saga/effects';

import * as actions from '../actions';
import { getProfileUser } from '../../services/profiles';

export function* getProfile() {
  try {
    const response = yield call(getProfileUser, {});
    const dataFetch = [];
    for (let key in response.data) {
      dataFetch.push({
        ...response.data[key],
        id: key,
      });
    }
    yield put(actions.getProfileSuccess(dataFetch[0]));
  } catch (error) {
    yield put(actions.getProfileFailed(error.response.error));
  }
}
