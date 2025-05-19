import { Injectable } from '@nestjs/common';
import { ConditionType, RewardType } from 'apps/gateway/libs/enum';
import { RewardRepository } from '../repository/reward.repository';

@Injectable()
export class RewardService {
  constructor(private readonly rewardRepository: RewardRepository) {}

  addReward(
    eventId: string,
    conditionType: ConditionType,
    targetCount: number,
    rewardType: RewardType,
    data: { id: string; quantity: number },
  ) {
    return this.rewardRepository.addReward(
      eventId,
      conditionType,
      targetCount,
      rewardType,
      data,
    );
  }
}
