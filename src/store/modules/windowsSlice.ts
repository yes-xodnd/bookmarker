import { createAction, createSlice } from "@reduxjs/toolkit";
import { WindowTypes } from 'src/constants/types';
import { RootState } from "..";

interface interfaceState {
  visibleWindow: WindowTypes;
}

const initialState: interfaceState = {
  visibleWindow: 'TABS',
};

const prepareWindowType = (type: WindowTypes) => ({ payload: type });

export const openWindow = createAction(
  'WINODWS/OPEN_WINDOW',
  prepareWindowType
);

export const selectIsVisibleWindow = (type: WindowTypes) => (state: RootState) => state.interfaces.visibleWindow === type;

const slice = createSlice({
  name: 'interface',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(
        openWindow,
        (state, action) => { 
          state.visibleWindow = action.payload;
        }
      )
  }
});

export default slice.reducer;