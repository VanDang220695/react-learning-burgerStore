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
    type: actionTypes.PROFILE_GET_DATA_FAILDED,
    payload,
  };
};

export const updateProfile = (payload) => {
  return {
    type: actionTypes.PROFILE_UPDATE_DATA,
    payload,
  };
};

export const setErrorProfileUpdate = (payload) => {
  return {
    type: actionTypes.PROFILE_UPDATE_DATA_STATUS,
    payload,
  };
};
