import { ActionType } from "typesafe-actions";
import { Epic as RxEpic } from "redux-observable";
import { UserState } from "./user/usertypes";
import { PostState } from "./post/posttypes";
import { ConfigState } from "./config/configtypes";
import { JobsState } from "./jobs/jobstypes";
import { MarketState } from "./market/markettypes";

import { BannerState } from "./banner/bannertypes";

import userActions from "./user/useractions";
import postActions from "./post/postactions";
import marketActions from "./market/marketactions";
import jobsActions from "./jobs/jobsactions";

import bannerActions from "./banner/banneractions";

import configActions from "./config/configactions";

export interface RootState {
  user: UserState;
  config: ConfigState;
  post: PostState;
  market: MarketState;
  jobs: JobsState;
  banner: BannerState;
}

export type RootAction =
  | ActionType<typeof userActions>
  | ActionType<typeof configActions>
  | ActionType<typeof postActions>
  | ActionType<typeof marketActions>
  | ActionType<typeof jobsActions>
  | ActionType<typeof bannerActions>;

export type Epic = RxEpic<RootAction, RootAction, RootState>;
