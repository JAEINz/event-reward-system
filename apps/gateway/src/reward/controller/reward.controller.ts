import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Roles } from 'apps/gateway/libs/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'apps/gateway/libs/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'apps/gateway/libs/auth/guard/roles.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  AddRewardRequestDto,
  ClaimRewardRequestDto,
} from '../../../../libs/dto/reward.dto';
import { JwtUserPayload } from 'apps/gateway/libs/dto';
import { Request } from 'express';
import { forwardHttpRequest } from 'apps/gateway/libs/util/http-service-wrapper';

@Controller('reward')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RewardController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[관리자, 운영자] 이벤트 보상 등록 API',
  })
  @ApiCreatedResponse({ type: String })
  async addReward(@Body() requestDto: AddRewardRequestDto) {
    const observable = this.httpService.post(
      `http://localhost:3002/reward`,
      requestDto,
    );

    await forwardHttpRequest(observable);

    return { status: 'OK' };
  }

  @Post('/claim')
  @Roles('USER')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[유저] 이벤트 보상 요청 API',
  })
  @ApiConflictResponse({ description: '이미 수령된 리워드입니다.' })
  @ApiNotFoundResponse({
    description: '존재하지 않는 리워드이거나 존재하지 않는 유저입니다.',
  })
  @ApiBadRequestResponse({ description: '조건을 만족하지 못하였습니다.' })
  @ApiCreatedResponse({ type: String })
  async claimRewardRequest(
    @Req() req: Request,
    @Body() requestDto: ClaimRewardRequestDto,
  ) {
    const { userId } = req.user as JwtUserPayload;

    const observable = this.httpService.post(
      `http://localhost:3002/reward/claim`,
      requestDto,
      { headers: { 'user-id': userId } },
    );

    await forwardHttpRequest(observable);

    return { status: 'OK' };
  }
}
