import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utils/utils';

const initialState = {
  profile: {
    email: '',
  },
  loading: false,
  error: null,
  isUpdateProfileSuccess: false,
};

const getProfileStart = (state) => {
  return updateObject(state, {
    loading: true,
  });
};

const getProfileSuccess = (state, { payload }) => {
  return updateObject(state, {
    loading: false,
    profile: payload,
  });
};

const getProfileFailed = (state, { error }) => {
  return updateObject(state, {
    loading: false,
    error,
  });
};

const setErrorProfileStatus = (state, { payload }) => {
  return updateObject(state, {
    loading: false,
    isUpdateProfileSuccess: payload,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_GET_DATA_START:
      return getProfileStart(state);
    case actionTypes.PROFILE_GET_DATA_SUCCESS:
      return getProfileSuccess(state, action);
    case actionTypes.PROFILE_GET_DATA_FAILDED:
      return getProfileFailed(state, action);
    case actionTypes.PROFILE_UPDATE_DATA_STATUS:
      return setErrorProfileStatus(state, action);
    default:
      return state;
  }
};

export default reducer;
