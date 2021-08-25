import { combineEpics } from "redux-observable";
import actions from "./useractions";
import {
  requestFetchSignIn,
  requestFetchSignUp,
  requestUpdate,
  requestAllUser,
  requestSearchUser,
  requestDeleteNoti,
  requestGETONE,
  requestToken,
  requestDelete,
  requestUploadProfile,
  requestUserProfile,
} from "./userapi";
import { createAsyncEpic } from "../utils";

const fetchSignInEpic = createAsyncEpic(
  actions.fetchSignIn,
  requestFetchSignIn
);
const fetchSignUpEpic = createAsyncEpic(
  actions.fetchSignUp,
  requestFetchSignUp
);

const fetchUpdateEpic = createAsyncEpic(actions.fetchUpdate, requestUpdate);
const getOneEpic = createAsyncEpic(actions.getOne, requestGETONE);
const getAllUserEpic = createAsyncEpic(actions.getAllUser, requestAllUser);
const deleteNotiEpic = createAsyncEpic(actions.deleteNoti, requestDeleteNoti);
const fetchTokenEpic = createAsyncEpic(actions.fetchToken, requestToken);
const fetchDeleteEpic = createAsyncEpic(actions.fetchDelete, requestDelete);
const searchUserEpic = createAsyncEpic(actions.searchUser, requestSearchUser);

const fetchUploadProfileEpic = createAsyncEpic(
  actions.fetchUploadProfile,
  requestUploadProfile
);

const fetchUserProfileEpic = createAsyncEpic(
  actions.fetchUserProfile,
  requestUserProfile
);

export default combineEpics(
  fetchSignInEpic,
  fetchDeleteEpic,
  getAllUserEpic,
  deleteNotiEpic,
  getOneEpic,
  searchUserEpic,
  fetchSignUpEpic,
  fetchTokenEpic,
  fetchUploadProfileEpic,
  fetchUpdateEpic,
  fetchUserProfileEpic
);
