import { combineReducers, Reducer } from "@reduxjs/toolkit";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";
import AuthReducer, { AuthState } from "../features/auth/authSlice"
import CategoryReducer, { CategoryState } from "../features/category/categorySlice";
import ProductReducer, { ProductState } from "../features/product/productSlice";


export interface AppState {
  router: RouterState<unknown>;
  auth: AuthState,
  category: CategoryState,
  product: ProductState
}

const createRootReducer = (history: History<unknown>) =>
  combineReducers({
    router: connectRouter(history), // 集成路由状态
    auth: AuthReducer,
    category: CategoryReducer,
    product: ProductReducer
  });

export default createRootReducer;