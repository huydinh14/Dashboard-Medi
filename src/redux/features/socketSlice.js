import { createSlice } from "@reduxjs/toolkit";

const webSocketSlice = createSlice({
  name: "webSocket",
  initialState: {
    webSocket: null,
  },
  reducers: {
    setWebSocket: (state, action) => {
      state.webSocket = action.payload;
    },
  },
});

export const { setWebSocket } = webSocketSlice.actions;
export default webSocketSlice.reducer;
