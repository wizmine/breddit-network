import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { MessagesService } from './messages.service';
import { Server } from 'socket.io';
import { CreateMessageDto } from './dto/messages.dto';
@WebSocketGateway({ cors: { origin: '*' } })
export class MessagesGateway implements OnGatewayConnection {
  constructor(private readonly messagesService: MessagesService) {}
  @WebSocketServer()
  server: Server;

  // eslint-disable-next-line
  handleConnection(client: any) {
    console.log('connected');
  }

  @SubscribeMessage('server-message')
  async onNewMessage(@MessageBody() message: CreateMessageDto) {
    const { senderId, content, chatId, senderName } = message;

    const newMessage = await this.messagesService.create({
      senderId,
      content,
      chatId,
      senderName,
    });

    this.server.emit('client-message', newMessage);
  }
}
