import { request } from "../utils";
import {
  GetBannerRequestPayload,
  GetBannerSuccessPayload,
  DeleteBannerRequestPayload,
  DeleteBannerSuccessPayload,
  MakeBannerRequestPayload,
  MakeBannerSuccessPayload,
  GetFewBannerRequestPayload,
  GetFewBannerSuccessPayload,
} from "./bannertypes";

export const requestGetBanner = (payload: GetBannerRequestPayload) =>
  request.get(`/banner/home`).then<GetBannerSuccessPayload>(({ data }) => data);

export const requestGetFewBanner = (payload: GetFewBannerRequestPayload) =>
  request
    .get(`/banner/${payload}`)
    .then<GetFewBannerSuccessPayload>(({ data }) => data);

export const requestDeleteBanner = (payload: DeleteBannerRequestPayload) =>
  request
    .get(`/banner/delete/${payload}`)
    .then<DeleteBannerSuccessPayload>(({ data }) => data);

export const requestMakeBanner = async (payload: MakeBannerRequestPayload) => {
  var form_data = new FormData();
  form_data.append("pic", payload.pic);
  form_data.append("title", payload.title);
  form_data.append("link", payload.link);
  form_data.append("category", payload.category);

  try {
    const { data } = await request.post("/banner/create", form_data);
    const result: MakeBannerSuccessPayload = data;
    return result;
  } catch (e) {
    console.log(e);
  }
};
