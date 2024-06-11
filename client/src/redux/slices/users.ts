import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClassic } from "../../api/interceptors";
import { IAuthor } from "../../types/auth.types";

interface UserState {
  users: IAuthor[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const getAllUsers = createAsyncThunk("users/getAllUsers", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClassic.get<IAuthor[]>("/users");
    return response.data;
  } catch (error) {
    return rejectWithValue((error as any)?.response?.data || (error as Error).message);
  }
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<IAuthor[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const usersReducer = usersSlice.reducer;
