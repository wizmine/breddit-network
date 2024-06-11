import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password is too short (min 6)' })
  @IsString()
  password: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @MinLength(6, { message: 'Password is too short (min 6)' })
  @IsString()
  password: string;
}
