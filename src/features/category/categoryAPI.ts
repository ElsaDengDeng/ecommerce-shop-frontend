import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../../config";
import { Category } from "../../app/models/Category";
import { getCategorySuccess } from "./categorySlice";


export const fetchGetCategory = createAsyncThunk(
  "/categories",
  async(payload, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.get<Category[]>(`${API}/categories`);
      dispatch(getCategorySuccess(response.data))
      return response.data;
    } catch(error: any) {
      console.log("-------error", error)
      return rejectWithValue(error.response?.data?.error || "Signin failed")
    }
  }
)
