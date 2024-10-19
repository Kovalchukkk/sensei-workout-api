import { MinLength, IsString } from 'class-validator';

// should be static properties
export class ResetPasswordDto {
  @MinLength(6)
  @IsString()
  password: string;
}
