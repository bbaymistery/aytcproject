import { createSlice } from '@reduxjs/toolkit';

const langSlice = createSlice({
  name: 'lang',
  initialState: {
    current: 'az',
  },
  reducers: {
    setLang: (state, action) => {
      state.current = action.payload;
    }
  }
});

export const { setLang } = langSlice.actions;
export default langSlice.reducer;
