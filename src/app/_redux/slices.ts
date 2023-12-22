import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {ChatMessage, ChatState} from './interfaces';

const initialState: ChatState = {
    messages: [], currentUserId: "0", botIsTyping: false, counter: 0, sendRealMessages: false
};

const chatSlice = createSlice({
    name: 'chatState', initialState, reducers: {
        addMessage: (state, action: PayloadAction<ChatMessage>) => {
            state.messages.push(action.payload);
        }, updateCurrentUserId: (state, action: PayloadAction<string>) => {
            state.currentUserId = action.payload;
        }, updateBotIsTyping: (state, action: PayloadAction<boolean>) => {
            state.botIsTyping = action.payload;
        }, updateCounter: (state, action: PayloadAction<number>) => {
            state.counter = action.payload;
        }, updateSendRealMessages: (state, action: PayloadAction<boolean>) => {
            state.sendRealMessages = action.payload;
        }
        // Add other reducers here
    },
});

export const {
    addMessage,
    updateCurrentUserId,
    updateBotIsTyping,
    updateCounter,
    updateSendRealMessages
} = chatSlice.actions;
export default chatSlice.reducer;
