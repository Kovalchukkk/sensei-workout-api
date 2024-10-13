import { BadRequestException, Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'yahoo',
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_EMAIL_PASSWORD,
      },
    });
  }

  async sendVerificationCode(email: string, code: string): Promise<void> {
    const mailOptions = {
      from: process.env.ADMIN_EMAIL, // Admin (sender)
      to: email, // Recipient's email
      subject: 'Your Verification Code to SamuraiBody',
      text: `Your verification code is ${code}`, // Plain text email body
      // Optionally, you can use HTML if needed
      // html: `<b>Your verification code is ${code}</b>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
      throw new BadRequestException(
        'Failed to send verification email',
        error.message,
      );
    }
  }
}
