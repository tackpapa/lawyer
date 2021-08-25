import { request } from "../utils";
import { sendPushPayload, sendPushSuccessPayload } from "./configtypes";

export const requestSendPush = async (payload: sendPushPayload) => {
  return request
    .post("/api/allpush", payload)
    .then<sendPushSuccessPayload>(({ data }) => data);
};
