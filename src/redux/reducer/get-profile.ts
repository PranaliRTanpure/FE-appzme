import { createSlice } from "@reduxjs/toolkit";
import { Provider } from "../../sdk/requests";
import { fetchProfileData } from "../actions/profile-async-actions";

interface ProfileState {
  data: Provider | null; // Adjust the type according to your API response
  isLoading: boolean;
  isPendingGetProfile: boolean;
  isRefetching: boolean;
  refetch: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  data: null,
  isLoading: false,
  isPendingGetProfile: false,
  isRefetching: false,
  refetch: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileData.pending, (state) => {
        if (state.data === null) {
          state.isPendingGetProfile = true; // Initial fetch
        } else {
          state.isRefetching = true; // Refetching
          state.refetch = true;
        }
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isPendingGetProfile = false;
        state.isRefetching = false;
        state.refetch = false;
        state.data = action.payload;
      })
      .addCase(fetchProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isPendingGetProfile = false;
        state.isRefetching = false;
        state.refetch = false;
        state.error = action.payload as string;
      });
  },
});

export const profileReducer = profileSlice.reducer;
