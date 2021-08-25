import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  CreatePostSuccessPayload,
  GetCategoryPostSuccessPayload,
  initialState,
  PostState,
  UpdatePostSuccessPayload,
} from "./posttypes";
import postActions from "./postactions";

import userActions from "../user/useractions";

const persistConfig = {
  key: "post",
  storage: storage,
};
const post = createReducer<PostState>(initialState, {
  [getType(postActions.getPost.success)]: (state, { payload }) => {
    return {
      ...state,
      onepost: payload,
    };
  },
  [getType(postActions.likePost.success)]: (state, { payload }) => {
    return {
      ...state,
      ...(state.onepost?.category
        ? {
            [state.onepost.category]: state[state.onepost?.category].map(
              (item) => {
                if (item._id === payload) {
                  return {
                    ...item,
                    likes: item.likes + 1,
                  };
                }
                return item;
              }
            ),
          }
        : {}),
      onepost: state.onepost
        ? {
            ...state.onepost,
            likes: state.onepost.likes + 1,
          }
        : undefined,
      latest: state.latest.map((item) => {
        if (item._id === payload) {
          return {
            ...item,
            likes: item.likes + 1,
          };
        }
        return item;
      }),
    };
  },
  [getType(postActions.dislikePost.success)]: (state, { payload }) => {
    return {
      ...state,
      ...(state.onepost?.category
        ? {
            [state.onepost.category]: state[state.onepost?.category].map(
              (item) => {
                if (item._id === payload) {
                  return {
                    ...item,
                    likes: item.likes - 1,
                  };
                }
                return item;
              }
            ),
          }
        : {}),
      onepost: state.onepost
        ? {
            ...state.onepost,
            likes: state.onepost.likes - 1,
          }
        : undefined,
      latest: state.latest.map((item) => {
        if (item._id === payload) {
          return {
            ...item,
            likes: item.likes - 1,
          };
        }
        return item;
      }),
    };
  },
  [getType(postActions.getCategoryPost.success)]: (
    state,
    { payload }: { payload: GetCategoryPostSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.type]: state[payload.type].concat(payload.data),
      // [payload.type]: [],
    };
  },
  [getType(postActions.searchPost.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(postActions.getLatestPost.success)]: (state, { payload }) => {
    return {
      ...state,
      latest: state.latest.concat(payload),
    };
  },
  [getType(postActions.getPostPage.success)]: (state, { payload }) => {
    return {
      ...state,
      page: payload.posts,
      current: payload.page,
      allposts: payload.allpost,
    };
  },
  [getType(postActions.getAllPost.success)]: (state, { payload }) => {
    return {
      ...state,
      all: state.all.concat(payload),
    };
  },
  [getType(postActions.getNewPost.success)]: (state, { payload }) => {
    const index = payload.filter((val: any) => !state.latest.includes(val));
    return {
      ...state,
      latest: [...index, ...state["latest"]],
    };
  },
  [getType(postActions.getHotPost.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.posts,
    };
  },
  [getType(postActions.createPost.success)]: (
    state,
    { payload }: { payload: CreatePostSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.category]: [payload, ...state[payload.category]],
      latest: [payload, ...state["latest"]],
    };
  },

  [getType(userActions.logout)]: (state) => {
    return {
      ...state,
      usercall: [],
    };
  },

  [getType(postActions.updatePost.success)]: (
    state,
    { payload }: { payload: UpdatePostSuccessPayload }
  ) => {
    const index = state[payload.category].findIndex(
      (item) => item._id === payload._id
    );
    if (index === -1) {
      return state;
    }
    return {
      ...state,
      [payload.category]: state[payload.category].splice(index, 1, payload),
    };
  },
  [getType(postActions.deletePost.success)]: (state, { payload }) => {
    const index = state.all.filter((item) =>
      item._id === payload.id ? false : true
    );
    const index2 = state.page.filter((item) =>
      item._id === payload.id ? false : true
    );

    return {
      ...state,
      all: index,
      page: index2,
    };
  },
  [getType(userActions.fetchUserProfile.success)]: (state, { payload }) => {
    return {
      ...state,
      usercall: payload.post,
    };
  },

  [getType(postActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
});

export default persistReducer(persistConfig, post);
