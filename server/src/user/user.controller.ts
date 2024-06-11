import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(200)
  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @HttpCode(200)
  @Get(':id')
  async getProfileById(@Param('id') id: string) {
    return this.userService.getProfileById(id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update')
  @Auth()
  async update(@CurrentUser('id') id: string, @Body() dto: UserDto) {
    return this.userService.update(id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('delete')
  @Auth()
  async delete(@CurrentUser('id') id: string) {
    return this.userService.delete(id);
  }
}
