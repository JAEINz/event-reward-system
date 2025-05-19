import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import { CreateUserRequestDto } from 'apps/gateway/src/user/dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async createUser(@Body() requestDto: CreateUserRequestDto) {
    const { email, password, role } = requestDto;
    await this.userService.createUser(email, password, role);
  }
}
