import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { DeepPartial, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto): Promise<string> {
    const candidate = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!candidate) {
      const hashPassword = await bcrypt.hash(loginDto.password, 5);
      const newUser = this.userRepository.create({
        ...loginDto,
        password: hashPassword,
      });
      const savedUser = await this.userRepository.save(newUser);
      return await this.generateToken(savedUser);
    }

    const isPasswordEqual = await bcrypt.compare(
      loginDto.password,
      candidate.password,
    );

    if (!isPasswordEqual) {
      throw new UnauthorizedException();
    }

    return await this.generateToken(candidate);
  }

  async setVerificationCode(user: DeepPartial<User>, code: string) {
    const hashCode = await bcrypt.hash(code, 5);
    await this.userRepository.update(
      { id: user.id },
      { ...user, verificationCode: hashCode },
    );
  }

  async validateVerificationCode(
    user: DeepPartial<User>,
    code: string,
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(code, user?.verificationCode);

    if (!isValid) return null;
    return true;
  }

  private async generateToken(user: User): Promise<string> {
    const token = await this.jwtService.signAsync({ id: user.id });
    return token;
  }
}
