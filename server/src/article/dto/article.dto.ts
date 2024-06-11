import { IsString } from 'class-validator';

export class ArticleDto {
  @IsString()
  content: string;
}
