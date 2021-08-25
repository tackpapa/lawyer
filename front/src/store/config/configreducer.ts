import { createReducer, getType } from "typesafe-actions";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { initialState, ConfigState } from "./configtypes";
import configActions from "./configactions";

const persistConfig = {
  key: "config",
  storage: storage,
};
const config = createReducer<ConfigState>(initialState, {
  [getType(configActions.fetchSession)]: (state, { payload }) => {
    return {
      ...state,
      isBackground: !payload,
    };
  },
  [getType(configActions.sendPush.success)]: (state, { payload }) => {
    return {
      ...state,
    };
  },
  [getType(configActions.sendPush.failure)]: (state, { payload }) => {
    return {
      ...state,
    };
  },
});

export default persistReducer(persistConfig, config);
