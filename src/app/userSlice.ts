import { UserServerData } from "./../interfaces/interfaces";
import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

let userStorage = localStorage.getItem("user");
let parsedUser = userStorage && JSON.parse(userStorage);

const initialState = {
  user: parsedUser || ({} as UserServerData),
};

const userSlice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserServerData>) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const getUser = (state: RootState) => state.user;
export default userSlice.reducer;
