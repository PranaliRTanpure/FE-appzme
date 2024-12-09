import { createAsyncThunk } from "@reduxjs/toolkit";
import { Provider, UserControllerService } from "../../sdk/requests";

// Async thunk for fetching profile data
export const fetchProfileData = createAsyncThunk<
  Provider,
  string,
  { rejectValue: string }
>("profile/fetchProfile", async (xTenantId, { rejectWithValue }) => {
  try {
    const res = await UserControllerService.getProfile1({ xTenantId });
    return res.data as Provider;
  } catch (error) {
    if (error instanceof Error) {
      return rejectWithValue(error.message);
    } else {
      return rejectWithValue("An unexpected error occurred");
    }
  }
});
