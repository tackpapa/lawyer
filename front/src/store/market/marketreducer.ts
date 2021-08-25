import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  CreateMarketSuccessPayload,
  GetCategoryMarketSuccessPayload,
  initialState,
  MarketState,
  UpdateMarketSuccessPayload,
} from "./markettypes";
import marketActions from "./marketactions";
import userActions from "../user/useractions";

const persistConfig = {
  key: "market",
  storage: storage,
};
const market = createReducer<MarketState>(initialState, {
  [getType(marketActions.getMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      onemarket: payload,
    };
  },
  [getType(marketActions.getNewMarket.success)]: (state, { payload }) => {
    const index = payload.filter((val: any) => !state.latest.includes(val));
    return {
      ...state,
      latest: [...index, ...state["latest"]],
    };
  },
  [getType(marketActions.getCategoryMarket.success)]: (
    state,
    { payload }: { payload: GetCategoryMarketSuccessPayload }
  ) => {
    return {
      ...state,
      // [payload.type]: [],
      [payload.type]: state[payload.type].concat(payload.data),
    };
  },
  [getType(marketActions.searchMarket.success)]: (state, { payload }) => {
    return {
      ...state,
      [payload.type]: payload.data,
    };
  },

  [getType(marketActions.getLatestMarket.success)]: (state, { payload }) => {
    // return initialState;
    return {
      ...state,
      latest: state.latest.concat(payload),
      // latest: [],
    };
  },
  [getType(userActions.fetchUserProfile.success)]: (state, { payload }) => {
    return {
      ...state,
      usercall: payload.market,
    };
  },
  [getType(marketActions.createMarket.success)]: (
    state,
    { payload }: { payload: CreateMarketSuccessPayload }
  ) => {
    return {
      ...state,
      [payload.category]: [payload, ...state[payload.category]],
      latest: [payload, ...state["latest"]],
      usercall: [...state["usercall"], payload],
    };
  },
  [getType(marketActions.deleteResult.request)]: (state) => {
    return {
      ...state,
      result: [],
    };
  },
  [getType(marketActions.updateMarket.success)]: (
    state,
    { payload }: { payload: UpdateMarketSuccessPayload }
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
  [getType(userActions.logout)]: (state) => {
    return {
      ...state,
      usercall: [],
    };
  },
  [getType(marketActions.getMarketPage.success)]: (state, { payload }) => {
    return {
      ...state,
      page: payload.posts,
      current: payload.page,
      allposts: payload.allpost,
    };
  },
  [getType(marketActions.deleteMarket.success)]: (state, { payload }) => {
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
});

export default persistReducer(persistConfig, market);
