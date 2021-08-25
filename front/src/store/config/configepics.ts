import { combineEpics } from "redux-observable";
import { createAsyncEpic } from "../utils";
import actions from "./configactions";
import { requestSendPush } from "./configapi";

const sendPushEpic = createAsyncEpic(actions.sendPush, requestSendPush);

export default combineEpics(sendPushEpic);
