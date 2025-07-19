import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsEnum(['INTERN', 'ENGINEER', 'ADMIN'], {
    message: 'You need to Provide the accurate role',
  })
  role: 'INTERN' | 'ENGINEER' | 'ADMIN';
}
