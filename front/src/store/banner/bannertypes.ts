export interface BannerState {
  data: Banner[];
}

export enum Actions {
  GET_BANNER_REQUEST = "GETBANNER#REQUEST",
  GET_BANNER_SUCCESS = "GETBANNER#SUCCESS",
  GET_BANNER_FAILURE = "GETBANNER#FAILURE",
  GET_BANNER_CANCEL = "GETBANNER#CANCEL",

  DELETE_BANNER_REQUEST = "DELETEBANNER#REQUEST",
  DELETE_BANNER_SUCCESS = "DELETEBANNER#SUCCESS",
  DELETE_BANNER_FAILURE = "DELETEBANNER#FAILURE",
  DELETE_BANNER_CANCEL = "DELETEBANNER#CANCEL",

  MAKE_BANNER_REQUEST = "MAKEBANNER#REQUEST",
  MAKE_BANNER_SUCCESS = "MAKEBANNER#SUCCESS",
  MAKE_BANNER_FAILURE = "MAKEBANNER#FAILURE",
  MAKE_BANNER_CANCEL = "MAKEBANNER#CANCEL",

  GET_FEW_BANNER_REQUEST = "GET_FEWBANNER#REQUEST",
  GET_FEW_BANNER_SUCCESS = "GET_FEWBANNER#SUCCESS",
  GET_FEW_BANNER_FAILURE = "GET_FEWBANNER#FAILURE",
  GET_FEW_BANNER_CANCEL = "GET_FEWBANNER#CANCEL",
}

export const initialState: BannerState = {
  data: [],
};

export interface Banner {
  _id: string;
  title: string;
  category: string;
  pic: string;
  link: string;
  activated: boolean;
  created_At: string;
}

export type GetFewBannerRequestPayload = Pick<Banner, "category">;

export type GetFewBannerSuccessPayload = Banner;
export type GetBannerRequestPayload = void;
export type GetBannerSuccessPayload = Banner;
export type DeleteBannerRequestPayload = string;
export type DeleteBannerSuccessPayload = string;

export interface MakeBannerRequestPayload {
  title: string;
  category: string;
  link: string;
  pic: any;
}
export type MakeBannerSuccessPayload = Banner;
