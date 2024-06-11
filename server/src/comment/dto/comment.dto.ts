import { IsString } from 'class-validator';

export class CommentDto {
  @IsString()
  content: string;

  @IsString()
  articleId: string;

  @IsString()
  authorId: string;
}
