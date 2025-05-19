import { Body, Controller, Post, Headers } from '@nestjs/common';
import { RewardService } from '../service/reward.service';
import { AddRewardRequestDto } from 'apps/gateway/src/reward/dto';

@Controller('reward')
export class RewardController {
  constructor(private readonly rewardService: RewardService) {}

  @Post()
  async addReward(@Body() requestDto: AddRewardRequestDto) {
    const { eventId, conditionType, targetCount, rewardType, data } =
      requestDto;

    await this.rewardService.addReward(
      eventId,
      conditionType,
      targetCount,
      rewardType,
      data,
    );
  }
}
