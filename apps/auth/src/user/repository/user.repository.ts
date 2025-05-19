import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from '../../../../../model/user.schema';
import { UserRoleType } from 'apps/libs/enum/user.enum';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(Users.name) private readonly userModel: Model<UsersDocument>,
  ) {}

  async validateEmail(email: string) {
    const user = await this.userModel.findOne({ email });

    if (user) {
      throw new ForbiddenException('이미 가입된 email 입니다.');
    }
  }

  createUser(email: string, hashPassword: string, role: UserRoleType) {
    return this.userModel.create({
      email,
      password: hashPassword,
      role,
    });
  }

  async validateEmailGetUser(email: string) {
    const user = await this.userModel.findOne({
      email,
    });

    if (!user) {
      throw new ForbiddenException('유효하지 않은 계정 정보입니다.');
    }
    return { user };
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    return this.userModel.findOneAndUpdate(
      { _id: new Types.ObjectId(userId) },
      { refreshToken },
      { new: true },
    );
  }
}
