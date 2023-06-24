import { IResults } from "../interfaces/interfaces";
import { RootState } from "./store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { results: IResults[] } = {
  results: [],
};

const resultSlice = createSlice({
  name: "results",
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<IResults[]>) => {
      state.results = action.payload;
    },
  },
});

export const { setResults } = resultSlice.actions;
export const getResult = (state: RootState, id?: number) => {
  //@ts-ignore
  if (id) {
    let res = state.results.results.find((item) => item.id === id);
    if (res) return [res];
    return [];
  }

  return state.results.results;
};

export default resultSlice.reducer;
