import { request } from "../utils";
import {
  SignInRequestPayload,
  SignInSuccessPayload,
  SignUpRequestPayload,
  SignUpSuccessPayload,
  UpdateRequestPayload,
  UpdateSuccessPayload,
  AllUserSuccessPayload,
  DeleteNotiRequestPayload,
  DeleteNotiSuccessPayload,
  GetOneSuccessPayload,
  GetOneRequestPayload,
  TokenRequestPayload,
  TokenSuccessPayload,
  DeleteRequestPayload,
  DeleteSuccessPayload,
  UploadProfileRequestPayload,
  UploadProfileSuccessPayload,
  UserProfileSuccessPayload,
  UserProfileRequestPayload,
  SearchUserRequestPayload,
  SearchUserSuccessPayload,
} from "./usertypes";

export const requestFetchSignIn = (payload: SignInRequestPayload) => {
  return request
    .post("/user/login", payload)
    .then<SignInSuccessPayload>(({ data }) => data);
};

export const requestFetchSignUp = (payload: SignUpRequestPayload) =>
  request
    .post("/user/create", payload)
    .then<SignUpSuccessPayload>(({ data }) => data);

export const requestAllUser = (payload: string) => {
  return request
    .get(`/user/alluser/${payload}`)
    .then<AllUserSuccessPayload>(({ data }) => data);
};

export const requestGETONE = (payload: GetOneRequestPayload) =>
  request
    .get(`/user/${payload}`)
    .then<GetOneSuccessPayload>(({ data }) => data);

export const requestSearchUser = (payload: SearchUserRequestPayload) =>
  request
    .get(`/user/search/${payload}`)
    .then<SearchUserSuccessPayload>(({ data }) => data);

export const requestDeleteNoti = (payload: DeleteNotiRequestPayload) => {
  return request
    .get(`/user/deletenoti/${payload}`)
    .then<DeleteNotiSuccessPayload>(({ data }) => data);
};

export const requestUpdate = (payload: UpdateRequestPayload) =>
  request
    .post("/user/update", payload)
    .then<UpdateSuccessPayload>(({ data }) => data);

export const requestToken = (payload: TokenRequestPayload) => {
  return request
    .post("/user/token", { expotoken: payload })
    .then<TokenSuccessPayload>(({ data }) => data);
};

export const requestDelete = (payload: DeleteRequestPayload) =>
  request
    .get(`/user/deleteuser/${payload._id}`)
    .then<DeleteSuccessPayload>(({ data }) => data);

export const requestUploadProfile = (payload: UploadProfileRequestPayload) => {
  var form_data = new FormData();
  form_data.append("pic", {
    ...payload.pic,
    type: "image/jpeg",
  } as unknown as Blob);

  return request
    .post("/user/uploadProfile", form_data)
    .then<UploadProfileSuccessPayload>(({ data }) => data);
};

export const requestUserProfile = (payload: UserProfileRequestPayload) => {
  return request
    .get(`/user/profile/${payload._id}`)
    .then<UserProfileSuccessPayload>(({ data }) => data);
};
