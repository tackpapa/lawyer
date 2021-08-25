import { combineEpics } from "redux-observable";
import actions from "./banneractions";
import {
  requestGetBanner,
  requestDeleteBanner,
  requestGetFewBanner,
  requestMakeBanner,
} from "./bannerapi";
import { createAsyncEpic } from "../utils";

const getBannerEpic = createAsyncEpic(actions.getBanner, requestGetBanner);
const deleteBannerEpic = createAsyncEpic(
  actions.deleteBanner,
  requestDeleteBanner
);
const getFewBannerEpic = createAsyncEpic(
  actions.getFewBanner,
  requestGetFewBanner
);

const makeBannerEpic = createAsyncEpic(actions.makeBanner, requestMakeBanner);

export default combineEpics(
  getBannerEpic,
  getFewBannerEpic,
  makeBannerEpic,
  deleteBannerEpic
);
