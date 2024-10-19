import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { EmailService } from 'src/emails/email.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: configService.get<string>('SECRET'),
      signOptions: { expiresIn: '24h' },
    }),
    TypeOrmModule.forFeature([User]),
    PassportModule,
  ],
  providers: [AuthService, JwtStrategy, EmailService],
  controllers: [AuthController],
})
export class AuthModule {}
