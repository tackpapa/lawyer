import { createAsyncAction } from "typesafe-actions";

import {
  Actions,
  GetBannerRequestPayload,
  GetBannerSuccessPayload,
  DeleteBannerRequestPayload,
  DeleteBannerSuccessPayload,
  MakeBannerRequestPayload,
  MakeBannerSuccessPayload,
  GetFewBannerRequestPayload,
  GetFewBannerSuccessPayload,
} from "./bannertypes";

const getBanner = createAsyncAction(
  Actions.GET_BANNER_REQUEST,
  Actions.GET_BANNER_SUCCESS,
  Actions.GET_BANNER_FAILURE,
  Actions.GET_BANNER_CANCEL
)<GetBannerRequestPayload, GetBannerSuccessPayload, undefined, undefined>();

const deleteBanner = createAsyncAction(
  Actions.DELETE_BANNER_REQUEST,
  Actions.DELETE_BANNER_SUCCESS,
  Actions.DELETE_BANNER_FAILURE,
  Actions.DELETE_BANNER_CANCEL
)<
  DeleteBannerRequestPayload,
  DeleteBannerSuccessPayload,
  undefined,
  undefined
>();

const makeBanner = createAsyncAction(
  Actions.MAKE_BANNER_REQUEST,
  Actions.MAKE_BANNER_SUCCESS,
  Actions.MAKE_BANNER_FAILURE,
  Actions.MAKE_BANNER_CANCEL
)<MakeBannerRequestPayload, MakeBannerSuccessPayload, undefined, undefined>();

const getFewBanner = createAsyncAction(
  Actions.GET_FEW_BANNER_REQUEST,
  Actions.GET_FEW_BANNER_SUCCESS,
  Actions.GET_FEW_BANNER_FAILURE,
  Actions.GET_FEW_BANNER_CANCEL
)<
  GetFewBannerRequestPayload,
  GetFewBannerSuccessPayload,
  undefined,
  undefined
>();

export default {
  getBanner,
  deleteBanner,
  getFewBanner,
  makeBanner,
};
