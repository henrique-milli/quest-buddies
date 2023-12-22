import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './slices';

const store = configureStore({
    reducer: {
        chatState: chatReducer,
    },
});

export default store;
