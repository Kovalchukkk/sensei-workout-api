import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/emails/email.service';
import { AuthenticateGuard } from 'src/decorators/authenticate.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
  ) {}

  @Post('send-verification')
  async sendVerification(@Body('email') email: string): Promise<string> {
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000,
    ).toString(); // Generate a 6-digit code

    const [token] = await Promise.all([
      await this.authService.setVerificationCode(email, verificationCode),
      await this.emailService.sendVerificationCode(email, verificationCode),
    ]);
    return token;
  }

  @UseGuards(AuthenticateGuard)
  @Post('validate-verification')
  async validateVerification(
    @Request() req,
    @Body('verificationCode') code: string,
  ): Promise<boolean> {
    const isValid = await this.authService.validateVerificationCode(
      req.user,
      code,
    );

    if (!isValid) {
      throw new ForbiddenException();
    }
    return true;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    return await this.authService.login(loginDto);
  }
}
