import { IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString()
  content: string;

  @IsString()
  chatId: string;

  @IsString()
  senderId: string;

  @IsString()
  senderName: string;
}
