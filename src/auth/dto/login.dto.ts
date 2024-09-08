import {
  IsEmail,
  MinLength,
  IsString,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

// should be static properties
export class LoginDto {
  @MinLength(1)
  @IsString()
  @IsOptional()
  username: string;

  @MinLength(1)
  @IsString()
  password: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
