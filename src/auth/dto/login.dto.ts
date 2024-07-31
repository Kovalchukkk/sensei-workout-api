import { IsEmail, MinLength, IsString, IsNotEmpty } from 'class-validator';

// should be static properties
export class LoginDto {
  @MinLength(1)
  @IsString()
  username: string;

  @MinLength(1)
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
