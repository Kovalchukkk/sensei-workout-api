import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  ForbiddenException,
  BadRequestException,
  Get,
  Res,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { EmailService } from 'src/emails/email.service';
import { AuthenticateGuard } from 'src/decorators/authenticate.guard';
import { ResetPasswordDto } from './dto/reset-password.dto';

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

  @UseGuards(AuthenticateGuard)
  @Post('reset-password')
  async resetUserPassword(
    @Request() req,
    @Body() resetPasswordDto: ResetPasswordDto,
  ): Promise<boolean> {
    const isUpdated = await this.authService.resetPassword(
      req.user,
      resetPasswordDto.password,
    );

    if (!isUpdated) {
      throw new BadRequestException();
    }
    return true;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<string> {
    return await this.authService.login(loginDto);
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    // This method will trigger the Google OAuth flow
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req, @Res() res: Response) {
    const token = await this.authService.generateToken(req.user);

    const redirectUrl = `${req.protocol}://${req.get(
      'host',
    )}/google/callback?token=${token}`;

    // HTML response with the token
    const htmlResponse = `
      <html>
        <head>
          <title>Authentication Successful</title>
        </head>
        <body>
          <h1>Authentication Successful!</h1>
          <p>You can now close this window and return to the app.</p>
          <script>
            // You can add any client-side logic here if needed
            // For example, you might want to send a message to the mobile app
            // using a custom URL scheme or deep linking
            window.location.href = "${redirectUrl}";
          </script>
        </body>
      </html>
    `;

    res.send(htmlResponse);
  }
}
