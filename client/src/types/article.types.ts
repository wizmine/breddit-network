export interface IComment {
  id: string;
  content: string;
  authorId: string;
  articleId: string;
  createdAt: Date;
  author: {
    id: string;
    name: string;
    email: string;
  };
}

export interface ILike {
  id: string;
  authorId: string;
  articleId: string;
}

export interface IArticle {
  id: string;
  content: string;
  authorId: string;
  author: {
    id: string;
    name: string;
    email: string;
  };
  comments: IComment[];
  likes: ILike[];
}

export interface IArticleResponse {
  content: string;
}

export interface ILikeResponse {
  id: string;
  authorId: string;
  articleId: string;
}

export interface ILikeRequest {
  authorId: string;
  articleId: string;
}

export interface ICommentRequest {
  content: string;
  authorId: string;
  articleId: string;
}

export interface ICommentResponse {
  id: string;
  articleId: string;
}
