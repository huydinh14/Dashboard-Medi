import { configureStore } from "@reduxjs/toolkit"
import userSlice from './features/userSlice';
import webSocketSlice from './features/socketSlice';

const store = configureStore({
    reducer: {
        user: userSlice,
        webSocket: webSocketSlice,
    },
});

export default store;