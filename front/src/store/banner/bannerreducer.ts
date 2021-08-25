import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState, BannerState } from "./bannertypes";
import bannerActions from "./banneractions";

const persistConfig = {
  key: "banner",
  storage: storage,
};
const banner = createReducer<BannerState>(initialState, {
  [getType(bannerActions.getBanner.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
  [getType(bannerActions.makeBanner.success)]: (state, { payload }) => {
    return {
      ...state,
      data: [...state.data, payload],
    };
  },
  [getType(bannerActions.deleteBanner.success)]: (state, { payload }) => {
    const index = state.data.filter((item) =>
      item._id === payload ? false : true
    );
    return {
      ...state,
      data: index,
    };
  },
  [getType(bannerActions.getFewBanner.success)]: (_state, { payload }) => {
    return {
      data: payload,
    };
  },
});

export default persistReducer(persistConfig, banner);
