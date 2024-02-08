import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const API_URL = 'https://api.github.com/repos/';
const BASE_URL = 'https://github.com/';

const getURLParams = (url: string): string => url.split(BASE_URL)[1];

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (params: string, { rejectWithValue }) => {
    try {
      const repo = getURLParams(params);

      const { data } = await axios(
        `${API_URL}${repo}/issues?per_page=100&state=all`,
      );

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const initialState: IssuesSliceState = {
  input: '',
  url: '',
  issues: [],
  status: 'loading',
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setInputValue: (state, action: PayloadAction<string>) => {
      state.input = action.payload;
      state.status = 'loading';
    },
    clearState: (state) => {
      state.url = '';
      state.issues = [];
      state.status = 'loading';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'loading';
        state.url = state.input;
        state.issues = [];
      })
      .addCase(fetchIssues.fulfilled, (state, action: PayloadAction<[]>) => {
        state.issues = action.payload;
        state.status = 'success';
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.status = 'error';
        state.issues = [];
      });
  },
});

export const { setInputValue, clearState } = issuesSlice.actions;

export default issuesSlice.reducer;

export const state = (state: RootState) => state.issuesSlice;
export const input = (state: RootState) => state.issuesSlice.input;
export const url = (state: RootState) => state.issuesSlice.url;
export const issues = (state: RootState) => state.issuesSlice.issues;
export const status = (state: RootState) => state.issuesSlice.status;
