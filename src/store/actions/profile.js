import * as actionTypes from '../actions/actionTypes';

export const getProfileStart = () => {
  return {
    type: actionTypes.PROFILE_GET_DATA_START,
  };
};

export const getProfile = () => {
  return {
    type: actionTypes.PROFILE_GET_DATA,
  };
};

export const getProfileSuccess = (payload) => {
  return {
    type: actionTypes.PROFILE_GET_DATA_SUCCESS,
    payload,
  };
};

export const getProfileFailed = (payload) => {
  return {
    type: actionTypes.PURCHASE_BURGER_FAILED,
    payload,
  };
};
