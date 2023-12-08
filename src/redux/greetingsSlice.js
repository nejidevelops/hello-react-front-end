import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGreeting = createAsyncThunk('greetings/fetchGreeting', async () => {
  const response = await axios.get('http://127.0.0.1:3000/random_greeting');
  return response.data[0].greeting;
});

const greetingsSlice = createSlice({
  name: 'greetings',
  initialState: {
    greeting: '',
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGreeting.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGreeting.fulfilled, (state, action) => {
        state.loading = false;
        state.greeting = action.payload;
      })
      .addCase(fetchGreeting.rejected, (state) => {
        state.loading = false;
        state.error = 'Error fetching greeting';
      });
  },
});

export default greetingsSlice.reducer;
