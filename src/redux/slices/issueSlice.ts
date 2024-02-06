import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';

const API_URL = 'https://api.github.com/repos/';
const BASE_URL = 'https://github.com/';

const getURLParams = (url: string): string => url.split(BASE_URL)[1];

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async (params: string) => {
    const repo = getURLParams(params);

    const { data } = await axios(
      `${API_URL}${repo}/issues?per_page=100&state=all`,
    );

    return data;
  },
);

const initialState: IssuesSliceState = {
  url: '',
  issues: [],
  status: 'loading',
};

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    setUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.status = 'loading';
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

export const { setUrl } = issuesSlice.actions;

export default issuesSlice.reducer;

export const issues = (state: RootState) => state.issuesSlice.issues;
export const url = (state: RootState) => state.issuesSlice.url;
export const status = (state: RootState) => state.issuesSlice.status;
