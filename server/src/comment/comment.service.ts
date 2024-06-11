import { Injectable } from '@nestjs/common';
import { CommentDto } from './dto/comment.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class CommentService {
  constructor(private prisma: PrismaService) {}

  create(dto: CommentDto) {
    return this.prisma.comment.create({
      data: {
        content: dto.content,
        author: {
          connect: {
            id: dto.authorId,
          },
        },
        article: {
          connect: {
            id: dto.articleId,
          },
        },
      },
      include: {
        author: true,
      },
    });
  }

  async delete(id: string) {
    return this.prisma.comment.delete({
      where: {
        id: id,
      },
    });
  }
}
