import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleDto } from './dto/article.dto';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    const article = await this.prisma.article.findUnique({
      where: { id: id },
    });

    if (!article) throw new NotFoundException('Article not found!');

    return article;
  }

  async getFeed() {
    const articles = await this.prisma.article.findMany({
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
        likes: {
          include: {
            author: true,
          },
        },
      },
    });

    return articles.map((article) => ({
      id: article.id,
      content: article.content,
      authorId: article.authorId,
      author: {
        id: article.author.id,
        name: article.author.name,
        email: article.author.email,
      },
      comments: article.comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        authorId: comment.authorId,
        articleId: comment.articleId,
        createdAt: comment.createdAt,
        author: {
          id: comment.author.id,
          name: comment.author.name,
          email: comment.author.email,
        },
      })),
      likes: article.likes.map((like) => ({
        id: like.id,
        authorId: like.authorId,
        articleId: like.articleId,
        author: {
          id: like.author.id,
          name: like.author.name,
          email: like.author.email,
        },
      })),
    }));
  }

  async create(dto: ArticleDto, userId: string) {
    return this.prisma.article.create({
      include: {
        author: true,
      },
      data: {
        ...dto,
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }

  async update(dto: Partial<ArticleDto>, articleId: string, userId: string) {
    return this.prisma.article.update({
      where: {
        authorId: userId,
        id: articleId,
      },
      include: {
        author: true,
        comments: {
          include: {
            author: true,
          },
        },
        likes: {
          include: {
            author: true,
          },
        },
      },
      data: dto,
    });
  }

  async delete(articleId: string) {
    return this.prisma.article.delete({
      where: {
        id: articleId,
      },
    });
  }
}
