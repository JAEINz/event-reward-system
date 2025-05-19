import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../service/user.service';
import {
  CreateUserRequestDto,
  LoginRequestDto,
  LoginResponseDto,
} from 'apps/libs/dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/sign-up')
  async createUser(@Body() requestDto: CreateUserRequestDto) {
    const { email, password, role } = requestDto;
    await this.userService.createUser(email, password, role);
  }

  @Post('/sign-in')
  async login(@Body() requestDto: LoginRequestDto) {
    const { email, password } = requestDto;
    const { accessToken, refreshToken } = await this.userService.login(
      email,
      password,
    );

    return new LoginResponseDto(accessToken, refreshToken);
  }
}
