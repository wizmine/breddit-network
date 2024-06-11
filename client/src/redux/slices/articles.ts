import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosClassic, axiosWithAuth } from "../../api/interceptors";
import {
  IArticle,
  IArticleResponse,
  ILikeResponse,
  ILike,
  ILikeRequest,
  ICommentRequest,
  IComment,
  ICommentResponse,
} from "../../types/article.types";

interface ArticleState {
  articles: IArticle[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticleState = {
  articles: [],
  loading: false,
  error: null,
};

export const getFeed = createAsyncThunk("articles/getFeed", async (_, { rejectWithValue }) => {
  try {
    const response = await axiosClassic.get<IArticle[]>("/article/feed");
    return response.data;
  } catch (error) {
    return rejectWithValue((error as any)?.response?.data || (error as Error).message);
  }
});

export const createArticle = createAsyncThunk(
  "articles/createArticle",
  async (data: IArticleResponse, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.post("/article", data);
      return {
        ...response.data,
        comments: [],
        likes: [],
      };
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const updateArticle = createAsyncThunk(
  "articles/updateArticle",
  async ({ id, data }: { id: string; data: IArticleResponse }, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.put<IArticle>(`/article/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const deleteArticle = createAsyncThunk(
  "articles/deleteArticle",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.delete(`/article/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const createLike = createAsyncThunk(
  "articles/createLike",
  async (data: ILikeRequest, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.post("/like", data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const deleteLike = createAsyncThunk(
  "articles/deleteLike",
  async (data: ILikeResponse, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.delete(`/like/${data.id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const createComment = createAsyncThunk(
  "articles/createComment",
  async (data: ICommentRequest, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.post("/comment", data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

export const deleteComment = createAsyncThunk(
  "articles/deleteComment",
  async (data: ICommentResponse, { rejectWithValue }) => {
    try {
      const response = await axiosWithAuth.delete(`/comment/${data.id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as any)?.response?.data || (error as Error).message);
    }
  }
);

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeed.fulfilled, (state, action: PayloadAction<IArticle[]>) => {
        state.articles = action.payload;
        state.loading = false;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
        state.articles.push(action.payload);
        state.loading = false;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateArticle.fulfilled, (state, action: PayloadAction<IArticle>) => {
        const index = state.articles.findIndex((article) => article.id === action.payload.id);
        if (index !== -1) {
          state.articles[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteArticle.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
        state.articles = state.articles.filter((article) => article.id !== action.payload.id);
        state.loading = false;
      })
      .addCase(deleteArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createLike.fulfilled, (state, action: PayloadAction<ILike>) => {
        const { articleId } = action.payload;
        const article = state.articles.find((article) => article.id === articleId);
        if (article) {
          article.likes.push(action.payload);
        }
      })
      .addCase(deleteLike.fulfilled, (state, action: PayloadAction<ILikeResponse>) => {
        const { id, articleId } = action.payload;
        const article = state.articles.find((article) => article.id === articleId);
        if (article) {
          article.likes = article.likes.filter((like) => like.id !== id);
        }
      })
      .addCase(createComment.fulfilled, (state, action: PayloadAction<IComment>) => {
        const { articleId } = action.payload;
        const article = state.articles.find((article) => article.id === articleId);
        if (article) {
          article.comments.push(action.payload);
        }
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<ICommentResponse>) => {
        const { id, articleId } = action.payload;
        const article = state.articles.find((article) => article.id === articleId);
        if (article) {
          article.comments = article.comments.filter((comment) => comment.id !== id);
        }
      });
  },
});

export const articlesReducer = articleSlice.reducer;
