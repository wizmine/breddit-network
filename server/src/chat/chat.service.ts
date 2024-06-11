import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ChatService {
  constructor(private prisma: PrismaService) {}

  async create(firstUser: string, secondUser: string) {
    const isChatExist = await this.prisma.chat.findFirst({
      where: {
        AND: [
          {
            participants: {
              some: {
                id: firstUser,
              },
            },
          },
          {
            participants: {
              some: {
                id: secondUser,
              },
            },
          },
        ],
      },
    });

    if (isChatExist) {
      throw new NotFoundException('Chat already exists between the users');
    }

    const chat = await this.prisma.chat.create({
      data: {
        participants: {
          connect: [{ id: firstUser }, { id: secondUser }],
        },
      },
      include: {
        messages: true,
        participants: true,
      },
    });

    return chat;
  }

  async remove(id: string) {
    return await this.prisma.chat.delete({
      where: {
        id: id,
      },
      include: {
        messages: true,
        participants: true,
      },
    });
  }
}
