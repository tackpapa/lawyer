import { Post } from "../post/posttypes";
import { Job } from "../jobs/jobstypes";
import { Market } from "../market/markettypes";

export type UserState = User;

export enum Actions {
  FETCH_SIGN_IN_REQUEST = "FETCH_SIGN_IN#REQUEST",
  FETCH_SIGN_IN_SUCCESS = "FETCH_SIGN_IN#SUCCESS",
  FETCH_SIGN_IN_FAILURE = "FETCH_SIGN_IN#FAILURE",
  FETCH_SIGN_IN_CANCEL = "FETCH_SIGN_IN#CANCEL",

  FETCH_SIGN_UP_REQUEST = "FETCH_SIGN_UP#REQUEST",
  FETCH_SIGN_UP_SUCCESS = "FETCH_SIGN_UP#SUCCESS",
  FETCH_SIGN_UP_FAILURE = "FETCH_SIGN_UP#FAILURE",
  FETCH_SIGN_UP_CANCEL = "FETCH_SIGN_UP#CANCEL",

  SEARCH_USER_REQUEST = "SEARCHUSER#REQUEST",
  SEARCH_USER_SUCCESS = "SEARCHUSER#SUCCESS",
  SEARCH_USER_FAILURE = "SEARCHUSER#FAILURE",
  SEARCH_USER_CANCEL = "SEARCHUSER#CANCEL",

  SIGN_OUT = "SIGN_OUT",
  fetchSession = "FETCH_SESSION",

  DELETE_NOTI = "DELETE_NOTI",
  DELETE_NOTI_SUCCESS = "DELETE_NOTI_SUCCESS",
  DELETE_NOTI_FAILURE = "DELETE_NOTI_FAILURE",

  DELETERESULT_REQUEST = "DELETERESULT#REQUEST",
  DELETERESULT_SUCCESS = "DELETERESULT#SUCCESS",
  DELETERESULT_FAILURE = "DELETERESULT#FAILURE",
  DELETERESULT_CANCEL = "DELETERESULT#CANCEL",

  GETONE_IN_REQUEST = "GETONE_IN_REQUEST",
  GETONE_IN_SUCCESS = "GETONE_IN_SUCCESS",
  GETONE_IN_FAILURE = "GETONE_IN_FAILURE",
  GETONE_IN_CANCEL = "GETONE_IN_CANCEL",

  ALLUSER_IN_REQUEST = "ALLUSER_IN_REQUEST",
  ALLUSER_IN_SUCCESS = "ALLUSER_IN_SUCCESS",
  ALLUSER_IN_FAILURE = "ALLUSER_IN_FAILURE",
  ALLUSER_IN_CANCEL = "ALLUSER_IN_CANCEL",

  update_IN_REQUEST = "update#REQUEST",
  update_IN_SUCCESS = "update#SUCCESS",
  update_IN_FAILURE = "update#FAILURE",
  update_IN_CANCEL = "update#CANCEL",

  TOKEN_IN_REQUEST = "TOKEN#REQUEST",
  TOKEN_IN_SUCCESS = "TOKEN#SUCCESS",
  TOKEN_IN_FAILURE = "TOKEN#FAILURE",
  TOKEN_IN_CANCEL = "TOKEN#CANCEL",

  DELETE_IN_REQUEST = "DELETE#REQUEST",
  DELETE_IN_SUCCESS = "DELETE#SUCCESS",
  DELETE_IN_FAILURE = "DELETE#FAILURE",
  DELETE_IN_CANCEL = "DELETE#CANCEL",

  UploadProfile_IN_REQUEST = "uploadProfile#REQUEST",
  UploadProfile_IN_SUCCESS = "uploadProfile#SUCCESS",
  UploadProfile_IN_FAILURE = "uploadProfile#FAILURE",
  UploadProfile_IN_CANCEL = "uploadProfile#CANCEL",

  UserProfile_IN_REQUEST = "UserProfile_IN_REQUEST",
  UserProfile_IN_SUCCESS = "UserProfile_IN_SUCCESS",
  UserProfile_IN_FAILURE = "UserProfile_IN_FAILURE",
  UserProfile_IN_CANCEL = "UserProfile_IN_CANCEL",
}

export const initialState = {
  _id: "",
  token: "",
  email: "",
  name: "",
  level: 1,
  cell: "",
  exp: 0,
  profilepic: "",
  liked: [],
  expotoken: "",
  Noti: [],
  users: [],
  createdAt: "",
  result: [],
};

export interface User {
  _id: string;
  token: string;
  cell: string;
  email: string;
  level: number;
  name: string;
  createdAt: string;
  exp: number;
  profilepic: string;
  liked: string[];
  expotoken: string;
  Noti: string[];
  users: User[];
  result: User[];
}

export interface SignInRequestPayload {
  code: string;
  uri: string;
}

export type GetOneRequestPayload = string;

export interface UpdateRequestPayload {
  email: string;
  password?: string;
  name?: string;
  cell?: string;
  memo?: string;
}

export interface UploadProfileRequestPayload {
  pic: {
    name: string;
    type: string;
    uri: string;
  };
}
export interface UserProfileRequestPayload {
  _id: string;
}
export type fetchSessionPayload = boolean;

export interface UserProfileSuccessPayload {
  posts: Post[];
  jobs: Job[];
  markets: Market[];
}

export type DeleteResultRequestPayload = void;
export type DeleteResultSuccessPayload = void;

export interface DeleteRequestPayload {
  _id: String;
}

export type TokenRequestPayload = string;
export type DeleteNotiRequestPayload = string;
export type DeleteNotiSuccessPayload = void;
export type TokenSuccessPayload = void;
export type GetOneSuccessPayload = User;

export interface SignUpRequestPayload extends SignInRequestPayload {
  name: string;
  cell?: number;
}

export type AllUserSuccessPayload = User[];
export type SignInSuccessPayload = User;
export type SignUpSuccessPayload = User;

export type UpdateSuccessPayload = User;
export type DeleteSuccessPayload = String;
export type UploadProfileSuccessPayload = User;
export type SearchUserRequestPayload = String;
export interface SearchUserSuccessPayload {
  data: User[];
}
