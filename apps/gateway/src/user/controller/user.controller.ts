import { Body, Controller, Post } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreateUserRequestDto,
  LoginRequestDto,
  LoginResponseDto,
} from '../dto';
import { forwardHttpRequest } from 'apps/gateway/libs/util/http-service-wrapper';

@Controller('user')
export class UserController {
  constructor(private readonly httpService: HttpService) {}

  @Post('/sign-up')
  @ApiOperation({
    summary: '유저 생성 API',
  })
  @ApiForbiddenResponse({ description: '이미 가입된 email 입니다.' })
  @ApiCreatedResponse({ type: String })
  async createUser(@Body() requestDto: CreateUserRequestDto) {
    const observable = this.httpService.post(
      `http://localhost:3001/user/sign-up`,
      requestDto,
    );

    await forwardHttpRequest(observable);

    return { status: 'OK' };
  }

  @Post('/sign-in')
  @ApiOperation({
    summary: '로그인 API',
  })
  @ApiForbiddenResponse({ description: '유효하지 않은 계정 정보입니다.' })
  @ApiCreatedResponse({ type: String })
  async login(@Body() requestDto: LoginRequestDto) {
    const observable = this.httpService.post(
      `http://localhost:3001/user/sign-in`,
      requestDto,
    );

    const response = await forwardHttpRequest(observable);

    return new LoginResponseDto(
      response.data.accessToken,
      response.data.refreshToken,
    );
  }
}
