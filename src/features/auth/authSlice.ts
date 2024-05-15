import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { fetchSignin, fetchSignup } from './authAPI';

export interface SignPayload {
  email: string;
  name: string;
  password: string;
}

export interface AuthState {
  signup: {
    loaded: boolean;
    success: boolean;
    message: string;
  };
  signin: {
    loaded: boolean;
    success: boolean;
    message: string;
  };
}

const initialState: AuthState = {
  signup: {
    loaded: false,
    success: false,
    message: '',
  },
  signin: {
    loaded: false,
    success: false,
    message: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup: (state) => {
      state.signup.loaded = false;
      state.signin.success = false;
    },
    signupSuccess: (state) => {
      state.signin.loaded = true;
      state.signin.success = true;
    },
    signupFail: (state, action: PayloadAction<{ message: string }>) => {
      state.signup.loaded = true;
      state.signup.success = false;
      state.signin.message = action.payload.message;
    },
    resetSignup: (state) => {
      state.signup.loaded = false;
      state.signup.success = false;
      state.signin.message = '';
    },
    signinSuccess: (state) => {
      state.signup.loaded = true;
      state.signup.success = true;
    },
    signinFail: (state, action: PayloadAction<{ message: string }>) => {
      state.signup.loaded = true;
      state.signup.success = false;
      state.signin.message = action.payload.message;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignup.pending, (state) => {
        state.signup.loaded = false;
        state.signup.success = false;
        state.signup.message = ''; // 清空之前的消息
      })
      .addCase(fetchSignup.fulfilled, (state, action: PayloadAction<any>) => {
        state.signup.loaded = true;
        state.signup.success = true;
        state.signup.message = ''; // 登录成功
      })
      .addCase(fetchSignup.rejected, (state, action: PayloadAction<any>) => {
        state.signup.loaded = true;
        state.signup.success = false;
        console.log('fetchSignup.rejected', action.payload)
        state.signup.message = action.payload; // 登录失败
      })
      .addCase(fetchSignin.pending, (state) => {
        state.signin.loaded = false;
        state.signin.success = false;
        state.signin.message = ""; // 清空之前的消息
      })
      .addCase(fetchSignin.fulfilled, (state, action: PayloadAction<any>) => {
        state.signin.loaded = true;
        state.signin.success = true;
        state.signin.message = ""; // 登录成功
      })
      .addCase(fetchSignin.rejected, (state, action: PayloadAction<any>) => {
        state.signin.loaded = true;
        state.signin.success = false;
        state.signin.message = action.payload || "Signin failed";
      });
  },
  selectors: {
    selectAuth: state => state
  },
});

export const { selectAuth } = authSlice.selectors
export const { signup, signupSuccess, signupFail, resetSignup, signinSuccess, signinFail } =
  authSlice.actions;

export default authSlice.reducer;
