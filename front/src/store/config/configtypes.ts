export interface ConfigState {
  isBackground: Boolean;
}

export enum Actions {
  fetchSession = "FETCH_SESSION",

  SEND_PUSH_REQUEST = "SEND_PUSH#REQUEST",
  SEND_PUSH_SUCCESS = "SEND_PUSH#SUCCESS",
  SEND_PUSH_FAILURE = "SEND_PUSH#FAILURE",
  SEND_PUSH_CANCEL = "SEND_PUSH#CANCEL",
}

export const initialState: ConfigState = {
  isBackground: false,
};

export type fetchSessionPayload = boolean;

export interface sendPushPayload {
  msg: string;
}

export type sendPushSuccessPayload = boolean;
