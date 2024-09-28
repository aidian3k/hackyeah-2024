import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  authenticated: boolean;
  token: string | null;
  nickname: string | null;
}

const initialState: UserState = {
  authenticated: false,
  token: null,
  nickname: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.authenticated = true;
      state.token = action.payload.token;
      state.nickname = action.payload.nickname;
    },
    logout: state => {
      state.authenticated = false;
      state.token = null;
      state.nickname = null;
    },
    updateNickname: (state, action) => {
      state.nickname = action.payload;
    }
  }
});

export const { login, logout, updateNickname } = userSlice.actions;

export default userSlice.reducer;
