import { createSlice } from "@reduxjs/toolkit";
import get from "lodash/fp/get";

const currentUserSlice = createSlice({
  name: "currentUser",
  initialState: null,
  reducers: {
    store(state, action) {
      return action.payload;
    },
  },
});

const { actions, reducer } = currentUserSlice;

export const isLoggedInSelector = (state) => !!get("currentUser.id", state);

export const storeUser = actions.store;

export default reducer;
