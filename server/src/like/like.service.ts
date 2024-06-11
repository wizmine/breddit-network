import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService) {}

  async create(dto: LikeDto) {
    const existingLike = await this.prisma.like.findFirst({
      where: {
        authorId: dto.authorId,
        articleId: dto.articleId,
      },
    });

    if (existingLike) {
      return { message: 'Like is exist' };
    }

    return this.prisma.like.create({
      data: {
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
    });
  }

  async delete(id: string) {
    return this.prisma.like.delete({
      where: {
        id: id,
      },
    });
  }
}
