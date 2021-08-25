import axios from "axios";
import { from } from "rxjs";
import { map, exhaustMap, catchError, filter, takeUntil } from "rxjs/operators";
import { isActionOf } from "typesafe-actions";
import { Epic } from "./types";

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === "development") {
  axios.defaults.baseURL = "http://localhost/";
} else {
  axios.defaults.baseURL = "https://back.byker.io";
}

export const request = axios;

export const setHeader = (name: string, value: string) => {
  request.defaults.headers.common = {
    ...request.defaults.headers.common,
    [name]: value,
  };
};

export const handleSignIn = (token: string, userId: string) => {
  setHeader("authorization", `Bearer ${token}`);
};

export const createAsyncEpic = (
  asyncActionCreator: any,
  asyncApi: (payload: any, meta?: any) => Promise<any>
) => {
  const asyncEpic: Epic = (action$) =>
    action$.pipe(
      filter(isActionOf(asyncActionCreator.request)),
      exhaustMap((action) =>
        from(asyncApi(action.payload, action.meta)).pipe(
          map((response) => asyncActionCreator.success(response, action.meta)),
          takeUntil(
            action$.pipe(
              filter((cancelAction) =>
                asyncActionCreator.cancel
                  ? isActionOf(asyncActionCreator.cancel)(cancelAction)
                  : false
              )
            )
          ),
          catchError((e) => [asyncActionCreator.failure(e)])
        )
      )
    );

  return asyncEpic;
};
