import { IArticle, IArticleResponse } from "./article.types";
import { IChat } from "./chat.types";

export interface IAuthForm {
  email: string;
  name?: string;
  password: string;
}

export interface IAuthor {
  id: string;
  name: string;
  email: string;
  articles: IArticle[];
  chats: IChat[];
}

export interface IAuthResponse {
  accessToken: string;
  user: IAuthor;
}

export type TypeAuthorForm = Omit<IAuthor, "id"> & { password?: string };
