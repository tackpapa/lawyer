import { combineEpics } from "redux-observable";
import userEpic from "./user/userepics";
import postEpic from "./post/postepics";
import marketEpic from "./market/marketepics";
import jobsEpic from "./jobs/jobsepics";
import bannerEpic from "./banner/bannerepics";
import configEpic from "./config/configepics";

const epics = [
  userEpic,
  postEpic,
  marketEpic,
  jobsEpic,
  bannerEpic,
  configEpic,
];

const rootEpic = combineEpics(...epics);

export default rootEpic;
