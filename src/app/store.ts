import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { RouterState, routerMiddleware } from 'connected-react-router';
import createRootReducer from "./createRootReducer";
import { createHashHistory } from "history";

// 创建浏览器历史对象
export const history = createHashHistory()

export interface AppState {
  router: RouterState<Location>,
}


export const store = configureStore({
  reducer: createRootReducer(history),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(routerMiddleware(history)), // 添加路由中间件
});

// 定义 RootState 类型
export type RootState = ReturnType<typeof store.getState>;

// 定义 AppDispatch 类型
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>