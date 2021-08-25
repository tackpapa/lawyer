import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState, UserState } from "./usertypes";
import { handleSignIn } from "../utils";
import userActions from "./useractions";
import postActions from "../post/postactions";

const persistConfig = {
  key: "user",
  storage: storage,
};
const user = createReducer<UserState>(initialState, {
  [getType(userActions.logout)]: () => {
    return initialState;
  },

  [getType(postActions.likePost.success)]: (state, { payload }) => {
    return {
      ...state,
      liked: [...state.liked, payload],
    };
  },
  [getType(userActions.searchUser.success)]: (state, { payload }) => {
    return {
      ...state,
      result: payload,
    };
  },
  [getType(userActions.getOne.success)]: (state, { payload }) => {
    return payload;
  },
  [getType(postActions.dislikePost.success)]: (state, { payload }) => {
    const index = state.liked.filter((item) =>
      item === payload ? false : true
    );
    return {
      ...state,
      liked: index,
    };
  },

  [getType(userActions.fetchSignIn.success)]: (state, { payload }) => {
    handleSignIn(payload.token, payload._id);

    return {
      ...state,
      ...payload,
    };
  },
  [getType(userActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
  [getType(userActions.deleteNoti.success)]: (state, { payload }) => {
    return {
      ...state,
      Noti: [],
    };
  },
  [getType(userActions.getAllUser.success)]: (state, { payload }) => {
    return {
      ...state,
      users: state.users.concat(payload),
    };
  },

  [getType(userActions.fetchUpdate.success)]: (_state, { payload }) => {
    return payload;
  },
  [getType(userActions.fetchToken.success)]: (state, { payload }) => {
    return state;
  },

  [getType(userActions.fetchDelete.success)]: (_state, { payload }) => {
    return payload;
  },

  [getType(userActions.fetchUploadProfile.success)]: (_state, { payload }) => {
    return payload;
  },
});

export default persistReducer(persistConfig, user);
