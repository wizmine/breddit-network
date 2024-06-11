import { Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { RegisterDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/services/prisma.service';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        articles: true,
        chats: {
          include: {
            participants: true,
            messages: true,
          },
        },
      },
    });
  }

  async getProfileById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        articles: {
          include: {
            author: {
              select: {
                name: true,
                email: true,
                id: true,
              },
            },
            comments: {
              include: {
                author: {
                  select: {
                    name: true,
                    email: true,
                    id: true,
                  },
                },
              },
            },
            likes: {
              include: {
                author: {
                  select: {
                    name: true,
                    email: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
        chats: true,
      },
    });
  }

  async getByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        articles: true,
        chats: {
          include: {
            participants: true,
            messages: true,
          },
        },
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        articles: true,
        chats: true,
      },
    });
  }

  async create(dto: RegisterDto) {
    const user = {
      email: dto.email,
      name: dto.name,
      password: await hash(dto.password),
    };

    return this.prisma.user.create({
      data: user,
      include: {
        articles: true,
        chats: {
          include: {
            participants: true,
            messages: true,
          },
        },
      },
    });
  }

  async update(id: string, dto: UserDto) {
    let data = dto;

    if (dto.password) {
      data = { ...dto, password: await hash(dto.password) };
    }

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    });
  }

  async delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
