import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  CreateJobSuccessPayload,
  GetCategoryJobSuccessPayload,
  initialState,
  JobsState,
  UpdateJobSuccessPayload,
} from "./jobstypes";
import jobActions from "./jobsactions";
import userActions from "../user/useractions";

const persistConfig = {
  key: "job",
  storage: storage,
};
const job = createReducer<JobsState>(initialState, {
  [getType(jobActions.getJob.success)]: (state, { payload }) => {
    return {
      ...state,
      onejob: payload,
    };
  },
  [getType(jobActions.getNewJob.success)]: (state, { payload }) => {
    const index = payload.filter((val: any) => !state.latest.includes(val));
    return {
      ...state,
      latest: [...index, ...state["latest"]],
    };
  },

  [getType(jobActions.searchJob.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },
  [getType(userActions.logout)]: (state) => {
    return {
      ...state,
      usercall: [],
    };
  },
  [getType(jobActions.getJobPage.success)]: (state, { payload }) => {
    return {
      ...state,
      page: payload.posts,
      current: payload.page,
      allposts: payload.allpost,
    };
  },
  [getType(jobActions.deleteJob.success)]: (state, { payload }) => {
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
      usercall: payload.job,
    };
  },
  [getType(jobActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
  [getType(jobActions.getLatestJob.success)]: (state, { payload }) => {
    // return initialState;
    return {
      ...state,
      latest: state.latest.concat(payload),
    };
  },

  [getType(jobActions.createJob.success)]: (
    state,
    { payload }: { payload: CreateJobSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.category]: [payload, ...state[payload.category]],
      latest: [payload, ...state["latest"]],
    };
  },

  [getType(jobActions.updateJob.success)]: (
    state,
    { payload }: { payload: UpdateJobSuccessPayload }
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
  [getType(jobActions.getCategoryJob.success)]: (
    state,
    { payload }: { payload: GetCategoryJobSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.type]: state[payload.type].concat(payload.data),
      // [payload.type]: [],
    };
  },
});

export default persistReducer(persistConfig, job);
