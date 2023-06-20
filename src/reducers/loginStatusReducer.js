import { createSlice } from "@reduxjs/toolkit";

const loginStatusSlice = createSlice({
  name: "loginStatus",
  initialState: {
    isChecking: true,
    isLogin: false,
  },
  reducers: {
    setLoginStatus(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = loginStatusSlice;

export const { setLoginStatus } = actions;

export default reducer;
