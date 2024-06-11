import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  firstUser: string;

  @IsString()
  secondUser: string;
}
