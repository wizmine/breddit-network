import { IsString } from 'class-validator';

export class LikeDto {
  @IsString()
  articleId: string;

  @IsString()
  authorId: string;
}
