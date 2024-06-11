import { Test, TestingModule } from '@nestjs/testing';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { PrismaService } from 'src/services/prisma.service';
import { ArticleDto } from './dto/article.dto';
import { NotFoundException } from '@nestjs/common';

describe('ArticleController', () => {
  let controller: ArticleController;
  let service: ArticleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticleController],
      providers: [ArticleService, PrismaService],
    }).compile();

    controller = module.get<ArticleController>(ArticleController);
    service = module.get<ArticleService>(ArticleService);
  });

  describe('getArticles', () => {
    it('should return an array of articles', async () => {
      const articles = [
        {
          id: '1',
          content: 'Test article',
          author: { id: '1', name: 'Yar', email: 'yar@gmail.com' },
          authorId: '431515',
          comments: [
            {
              id: 'string',
              content: 'string',
              authorId: 'string',
              articleId: 'string',
              author: { id: '1', name: 'Yar', email: 'yar@gmail.com' },
              createdAt: new Date(),
            },
          ],
          likes: [
            {
              id: 'string',
              authorId: 'string',
              articleId: 'string',
              author: { id: '1', name: 'Yar', email: 'yar@gmail.com' },
            },
          ],
        },
      ];
      jest.spyOn(service, 'getFeed').mockResolvedValue(articles);

      expect(await controller.getArticles()).toBe(articles);
    });
  });

  describe('create', () => {
    it('should create an article', async () => {
      const articleDto: ArticleDto = { content: 'created' };
      const userId = 'user-id';
      const createdArticle = {
        id: 'article-id',
        ...articleDto,
        authorId: userId,
        author: {
          id: 'string',
          email: 'string',
          password: 'string',
          name: 'string',
        },
      };

      jest.spyOn(service, 'create').mockResolvedValue(createdArticle);
      expect(await controller.create(articleDto, userId)).toBe(createdArticle);
    });
  });

  describe('update', () => {
    it('should update an article', async () => {
      const articleDto: ArticleDto = { content: 'updated' };
      const articleId = 'article-id';
      const userId = 'user-id';
      const author = {
        id: userId,
        email: 'string',
        password: 'string',
        name: 'string',
      };
      const updatedArticle = {
        id: articleId,
        ...articleDto,
        authorId: userId,
        author,
        comments: [],
        likes: [],
      };

      jest.spyOn(service, 'update').mockResolvedValue(updatedArticle);
      expect(await controller.update(articleDto, articleId, userId)).toBe(
        updatedArticle,
      );
    });
  });

  describe('delete', () => {
    it('should delete an article', async () => {
      const articleId = 'article-id';
      const deletedArticle = {
        id: articleId,
        content: 'deleted article',
        authorId: 'author-id',
      };

      jest.spyOn(service, 'delete').mockResolvedValue(deletedArticle);

      expect(await controller.delete(articleId)).toEqual(deletedArticle);
    });

    it('should throw NotFoundException when article not found', async () => {
      const articleId = 'non-existent-id';

      jest.spyOn(service, 'delete').mockRejectedValue(new NotFoundException());

      await expect(controller.delete(articleId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
