import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserRoleType } from 'apps/libs/enum/user.enum';
import * as bcrypt from 'bcrypt';
import { TokenService } from './token.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}

  async createUser(email: string, password: string, role: UserRoleType) {
    await this.userRepository.validateEmail(email);

    const hashPassword: string = await bcrypt.hash(password, 12);

    return this.userRepository.createUser(email, hashPassword, role);
  }

  async login(email: string, password: string) {
    const { user } = await this.userRepository.validateEmailGetUser(email);

    const validatePassword = await bcrypt.compare(password, user.password);
    if (!validatePassword) {
      throw new ForbiddenException('비밀번호가 일치하지 않습니다');
    }

    const userId = user.id;
    const role = user.roles;

    const refreshToken = this.tokenService.createRefreshToken({ userId });
    const hashedRefreshToken = this.tokenService.hashRefreshToken(refreshToken);
    await this.userRepository.updateRefreshToken(userId, hashedRefreshToken);

    const accessToken = this.tokenService.createAccessToken({
      userId,
      role,
    });

    return { accessToken, refreshToken };
  }
}
