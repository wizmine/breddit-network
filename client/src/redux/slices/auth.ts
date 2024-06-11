import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClassic, axiosWithAuth } from "../../api/interceptors";
import { IAuthForm, IAuthResponse, IAuthor } from "../../types/auth.types";
import { removeFromStorage, saveTokenStorage } from "../../services/auth-token.service";
import { IChat, IChatResponse } from "../../types/chat.types";

interface AuthState {
  user: IAuthor | null;
  accessToken: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
};

export const authMain = createAsyncThunk(
  "auth/main",
  async ({ type, data }: { type: "login" | "register"; data: IAuthForm }, { rejectWithValue }) => {
    try {
      const response = await axiosClassic.post<IAuthResponse>(`/auth/${type}`, data);
      if (response.data.accessToken) saveTokenStorage(response.data.accessToken);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const getNewTokens = createAsyncThunk(
  "auth/getNewTokens",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClassic.post<IAuthResponse>("/auth/login/access-token");
      if (response.data.accessToken) saveTokenStorage(response.data.accessToken);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClassic.post<boolean>("/auth/logout");
    if (response.data) removeFromStorage();
    return response.data;
  } catch (error) {
    return rejectWithValue((error as any)?.response?.data || (error as Error).message);
  }
});

export const createChat = createAsyncThunk(
  "auth/createChat",
  async (data: IChatResponse, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.post<IChat>("/chat", data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authMain.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authMain.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loading = false;
      })
      .addCase(authMain.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getNewTokens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNewTokens.fulfilled, (state, action: PayloadAction<IAuthResponse>) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.loading = false;
      })
      .addCase(getNewTokens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.loading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createChat.fulfilled, (state, action: PayloadAction<IChat>) => {
        state.user?.chats.push(action.payload);
        state.loading = false;
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const authReducer = authSlice.reducer;
