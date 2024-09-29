import { createSlice } from '@reduxjs/toolkit';
import {UserInfo} from "@/ts/interface/User.ts";

export interface UserState {
  authenticated: boolean;
  user: UserInfo | null;
}

const initialState: UserState = {
  authenticated: false,
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.user = action.payload;
    },
    logout: state => {
      state.authenticated = false;
      state.user = null;
    },
  }
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
