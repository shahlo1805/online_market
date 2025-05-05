import { IsString, IsEmail, MinLength, MaxLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MinLength(3, { message: 'Username kamida 3 ta belgidan iborat bo\'lishi kerak' })
  @MaxLength(20, { message: 'Username eng ko\'pi bilan 20 ta belgidan iborat bo\'lishi kerak' })
  username: string;

  @IsEmail({}, { message: 'Email noto\'g\'ri formatda' })
  email: string;

  @IsString()
  @MinLength(6, { message: 'Parol kamida 6 ta belgidan iborat bo\'lishi kerak' })
  password: string;
}