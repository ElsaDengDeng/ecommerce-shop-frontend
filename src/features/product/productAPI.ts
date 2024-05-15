import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config";
import { FilterPayload, GetProductPayload, filterProductSuccess, getProductByIdSuccess, getProductSuccess, searchProductSuccess } from "./productSlice";
import { Product } from "../../app/models/Product";


// /products?sortBy=createdAt&order=asc&limit=10
export const fetchGetProduct = createAsyncThunk(
  "core/products",
  async (payload: GetProductPayload, { dispatch, rejectWithValue }) => {
    try {
      const {sortBy, order = "desc", limit = 10} = payload
      const response = await axios.get<Product[]>(`${API}/products`, {
        params: {
          sortBy: sortBy,
          order: order,
          limit: limit
        }
      });
      dispatch(getProductSuccess({
        payload: response.data,
        sortBy
      }))
      return response.data;
    } catch (error: any) {
      console.log("-------error", error)
      return rejectWithValue(error.response?.data?.error || "Signin failed")
    }
  }
)
// /products/search?search=node&category=5fa11a0bfbe98b811e09d1ea
export const fetchSearchProduct = createAsyncThunk(
  "core/searchProducts",
  async (payload: {
    category: string
    search: string
  }, { dispatch, rejectWithValue }) => {
    const {category, search} = payload
    try {
      const response = await axios.get(`${API}/products/search`, {
        params: {
          search: search,
          category: category
        }
      });
      dispatch(searchProductSuccess(response.data))
      return response.data;
    } catch (error: any) {
      console.log("-------error", error)
      return rejectWithValue(error.response?.data?.error || "Signin failed")
    }
  }
)
// 商品过滤

export const fetchFilterProduct = createAsyncThunk(
  "core/filterProducts",
  async (payload: FilterPayload, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(`${API}/products/filter`, payload);
      dispatch(filterProductSuccess({
        skip: payload.skip,
        payload: response.data
      }))
      return response.data;
    } catch (error: any) {
      console.log("-------error", error)
      return rejectWithValue(error.response?.data?.error || "Signin failed")
    }
  }
)

// 通过商品id 获取商品详情
// /product/:productId
export const fetchGetProductById = createAsyncThunk(
  "core/getProductById",
  async (payload: {
    productId: string
  }, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get(`${API}/product/${payload.productId}`);
      dispatch(getProductByIdSuccess(response.data))
      return response.data;
    } catch (error: any) {
      console.log("-------error", error)
      return rejectWithValue(error.response?.data?.error || "Signin failed")
    }
  }
)

