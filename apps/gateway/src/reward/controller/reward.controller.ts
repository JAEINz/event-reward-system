import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
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
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  AddRewardRequestDto,
  AddRewardResponseDto,
  ClaimRewardRequestDto,
  GetAllRewardRequestHistoryListListRequestDto,
  GetAllRewardRequestHistoryListListResponseDto,
  GetUserRewardRequestHistoryListListRequestDto,
  GetUserRewardRequestHistoryListListResponseDto,
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
    description: `
      테스트용 아이템/쿠폰 목록:

      - 아이템 ID: 682afef81ddb3041864f1514
      - 아이템 ID: 682afef81ddb3041864f1518

      - 쿠폰 ID: 682ac06a00ba6bde16cf2b86
      - 쿠폰 ID: 682afef81ddb3041864f1515

      요청 Body의 **data.id** 필드에 위 ID 중 하나를 입력해 주세요.
        `,
  })
  @ApiCreatedResponse({ type: String })
  async addReward(@Body() requestDto: AddRewardRequestDto) {
    const observable = this.httpService.post(
      `http://localhost:3002/reward`,
      requestDto,
    );

    const response = await forwardHttpRequest(observable);

    return new AddRewardResponseDto(response.data.reward._id);
  }

  @Post('/claim')
  @Roles('USER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[유저, 운영자] 이벤트 보상 요청 API',
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

  @Get('list/all')
  @Roles('AUDITOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[감사자, 운영자] 보상 요청 전체 리스트 조회 API',
  })
  @ApiOkResponse({ type: GetAllRewardRequestHistoryListListResponseDto })
  async getRewardList(
    @Query() requestDto: GetAllRewardRequestHistoryListListRequestDto,
  ) {
    const { page, pageSize } = requestDto;
    const observable = this.httpService.get(
      `http://localhost:3002/reward/list/all?page=${page}&pageSize=${pageSize}`,
    );

    const response = await forwardHttpRequest(observable);

    return GetAllRewardRequestHistoryListListResponseDto.of(
      response.data.rewardList,
      response.data.totalCount,
    );
  }

  @Get('list/user')
  @Roles('USER', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[유저, 운영자] 유저 보상 요청 리스트 조회 API',
  })
  @ApiOkResponse({ type: GetUserRewardRequestHistoryListListResponseDto })
  async getUserRewardList(
    @Req() req: Request,
    @Query() requestDto: GetUserRewardRequestHistoryListListRequestDto,
  ) {
    const { page, pageSize } = requestDto;
    const { userId } = req.user as JwtUserPayload;
    const observable = this.httpService.get(
      `http://localhost:3002/reward/list/all?page=${page}&pageSize=${pageSize}`,
      { headers: { 'user-id': userId } },
    );

    const response = await forwardHttpRequest(observable);

    return GetUserRewardRequestHistoryListListResponseDto.of(
      response.data.rewardList,
      response.data.totalCount,
    );
  }
}
