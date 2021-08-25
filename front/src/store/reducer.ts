import { combineReducers } from "redux";

import user from "./user/userreducer";
import post from "./post/postreducer";
import jobs from "./jobs/jobsreducer";
import config from "./config/configreducer";
import market from "./market/marketreducer";
import banner from "./banner/bannerreducer";

const rootReducer = combineReducers({
  user,
  post,
  market,
  jobs,
  config,
  banner,
});

export default rootReducer;
