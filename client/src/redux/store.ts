import { configureStore } from "@reduxjs/toolkit";
import { articlesReducer } from "./slices/articles";
import { authReducer } from "./slices/auth";
import { usersReducer } from "./slices/users";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
