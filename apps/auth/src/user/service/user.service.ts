import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { UserRoleType } from 'apps/gateway/libs/enum/user.enum';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(email: string, password: string, role: UserRoleType) {
    await this.userRepository.validateEmail(email);

    const hashPassword: string = await bcrypt.hash(password, 12);

    return this.userRepository.createUser(email, hashPassword, role);
  }
}
