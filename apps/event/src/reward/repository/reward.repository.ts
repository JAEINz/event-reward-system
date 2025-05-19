import { Injectable } from '@nestjs/common';
import { ConditionType, RewardType } from 'apps/gateway/libs/enum';
import { InjectModel } from '@nestjs/mongoose';
import { Rewards, RewardsDocument } from 'model/reward.schema';
import { Model } from 'mongoose';

@Injectable()
export class RewardRepository {
  constructor(
    @InjectModel(Rewards.name)
    private readonly rewardModel: Model<RewardsDocument>,
  ) {}

  addReward(
    eventId: string,
    conditionType: ConditionType,
    targetCount: number,
    rewardType: RewardType,
    data: { id: string; quantity: number },
  ) {
    return this.rewardModel.create({
      eventId,
      conditionType,
      targetCount,
      rewardType,
      data,
    });
  }
}
