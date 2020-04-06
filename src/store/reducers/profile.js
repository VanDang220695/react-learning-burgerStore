import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
  profile: {
    email: '',
  },
  loading: false,
  error: null,
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

const getProfileFailed = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
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
    default:
      return state;
  }
};

export default reducer;
