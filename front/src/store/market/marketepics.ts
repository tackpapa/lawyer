import { combineEpics } from "redux-observable";
import actions from "./marketactions";
import {
  requestCreateMarket,
  requestUpdateMarket,
  requestGetMarket,
  requestSearchMarket,
  requestGetMarketPage,
  requestGetCategoryMarket,
  requestGetLatestMarket,
  requestDeleteMarket,
} from "./marketapi";
import { createAsyncEpic } from "../utils";

const getMarketEpic = createAsyncEpic(actions.getMarket, requestGetMarket);

const getCategoryMarketEpic = createAsyncEpic(
  actions.getCategoryMarket,
  requestGetCategoryMarket
);
const searchMarketEpic = createAsyncEpic(
  actions.searchMarket,
  requestSearchMarket
);
const deleteMarketEpic = createAsyncEpic(
  actions.deleteMarket,
  requestDeleteMarket
);
const getMarketPageEpic = createAsyncEpic(
  actions.getMarketPage,
  requestGetMarketPage
);
const getLatestMarketEpic = createAsyncEpic(
  actions.getLatestMarket,
  requestGetLatestMarket
);
const createMarketEpic = createAsyncEpic(
  actions.createMarket,
  requestCreateMarket
);
const updateMarketEpic = createAsyncEpic(
  actions.updateMarket,
  requestUpdateMarket
);

export default combineEpics(
  getMarketEpic,
  getCategoryMarketEpic,
  searchMarketEpic,
  getMarketPageEpic,
  createMarketEpic,
  updateMarketEpic,
  getLatestMarketEpic,
  deleteMarketEpic
);
