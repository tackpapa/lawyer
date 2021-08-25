import { createAction, createAsyncAction } from "typesafe-actions";

import {
  Actions,
  fetchSessionPayload,
  sendPushPayload,
  sendPushSuccessPayload,
} from "./configtypes";

const fetchSession = createAction(Actions.fetchSession)<fetchSessionPayload>();

const sendPush = createAsyncAction(
  Actions.SEND_PUSH_REQUEST,
  Actions.SEND_PUSH_SUCCESS,
  Actions.SEND_PUSH_FAILURE,
  Actions.SEND_PUSH_CANCEL
)<sendPushPayload, sendPushSuccessPayload, undefined, undefined>();

export default {
  fetchSession,
  sendPush,
};
