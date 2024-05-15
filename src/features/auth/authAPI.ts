import { createAsyncThunk } from "@reduxjs/toolkit";
import { SignPayload, signinSuccess, signupSuccess } from "./authSlice";
import axios from "axios";
import { API } from "../../config";


export const fetchSignup = createAsyncThunk(
  "auth/signup",
  async(payload: SignPayload, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.post(`${API}/signup`, payload);
      dispatch(signupSuccess())
      return response.data;
    } catch(error: any) {
      console.log("-------error", error)
      return rejectWithValue(error.response?.data?.error || "Signin failed")
    }
  }
)

export const fetchSignin = createAsyncThunk(
  "auth/signin",
  async(payload: SignPayload, {dispatch, rejectWithValue}) => {
    try {
      const response = await axios.post(`${API}/signin`, payload);
      localStorage.setItem("jwt", JSON.stringify(response.data))
      dispatch(signinSuccess())
      return response.data;
    } catch(error: any) {
      console.log("-------error", error)
      return rejectWithValue(error.response?.data?.error || "Signin failed")
    }
  }
)