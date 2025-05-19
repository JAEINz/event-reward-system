import { Body, Controller, Post, Headers, Get, Query } from '@nestjs/common';
import { RewardService } from '../service/reward.service';
import {
  AddRewardRequestDto,
  ClaimRewardRequestDto,
  GetAllRewardRequestHistoryListListRequestDto,
  GetUserRewardRequestHistoryListListRequestDto,
} from 'apps/libs/dto/reward.dto';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async addReward(@Body() requestDto: AddRewardRequestDto) {
    const { eventId, conditionType, targetCount, rewardType, data } =
      requestDto;

    const reward = await this.rewardService.addReward(
      eventId,
      conditionType,
      targetCount,
      rewardType,
      data,
    );

    return { reward };
  }

  @Post('/claim')
  async claimReward(
    @Headers('user-id') userId: string,
    @Body() requestDto: ClaimRewardRequestDto,
  ) {
    const { rewardId, eventId } = requestDto;

    await this.rewardService.claimReward(userId, rewardId, eventId);
  }

  @Get('list/all')
  async getAllRewardRequestHistoryList(
    @Query() requestDto: GetAllRewardRequestHistoryListListRequestDto,
  ) {
    const { page, pageSize } = requestDto;
    const { rewardList, totalCount } =
      await this.rewardService.getAllRewardRequestHistoryList(page, pageSize);

    return { rewardList, totalCount };
  }

  @Get('list/user')
  async getUserRewardRequestHistoryList(
    @Headers('user-id') userId: string,
    @Query() requestDto: GetUserRewardRequestHistoryListListRequestDto,
  ) {
    const { page, pageSize } = requestDto;
    const { rewardList, totalCount } =
      await this.rewardService.getUserRewardRequestHistoryList(
        userId,
        page,
        pageSize,
      );

    return { rewardList, totalCount };
  }
}
