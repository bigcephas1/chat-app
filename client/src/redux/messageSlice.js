import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  messages: [],
  loading: false,
};

// Fetch all messages from the server
export const fetchMessages = createAsyncThunk('messages/fetchMessages', async () => {
  const response = await axios.get('http://localhost:5000/api/chat/messages');
  return response.data.messages;
});

const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addMessage } = messageSlice.actions;
export default messageSlice.reducer;
