import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  name: string;

  @MinLength(6, { message: 'Password is too short (min 6)' })
  @IsOptional()
  @IsString()
  password: string;
}
