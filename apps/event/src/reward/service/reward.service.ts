import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ConditionType,
  RewardType,
  UserRewardRequestHistoryStatus,
} from 'apps/libs/enum';
import { RewardRepository } from '../repository/reward.repository';
import { ItemTable, CouponTable } from 'constants-data';

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

  async claimReward(userId: string, rewardId: string, eventId: string) {
    await this.rewardRepository.validateUserRewardRequestHistory(
      userId,
      rewardId,
      eventId,
    );

    const { conditionType, targetCount, rewardType, data } =
      await this.rewardRepository.getRewardByRewardId(rewardId);

    if ((conditionType as ConditionType) == ConditionType.EXP) {
      const { exp } =
        await this.rewardRepository.getUserCharacterExpByUserId(userId);
      if (exp < targetCount) {
        await this.rewardRepository.createUserRewardHistory(
          userId,
          rewardId,
          eventId,
          UserRewardRequestHistoryStatus.FAILED,
        );
        throw new BadRequestException('조건을 만족하지 못했습니다.');
      }
    }

    if ((conditionType as ConditionType) == ConditionType.FRIEND_INVITATION) {
      const invitedCount =
        await this.rewardRepository.getUserFriendInvitationCount(userId);
      if (invitedCount < targetCount) {
        await this.rewardRepository.createUserRewardHistory(
          userId,
          rewardId,
          eventId,
          UserRewardRequestHistoryStatus.FAILED,
        );
        throw new BadRequestException('조건을 만족하지 못했습니다.');
      }
    }

    switch (rewardType as RewardType) {
      case RewardType.POINT:
        await this.rewardRepository.updateUserPoint(userId, data.quantity);
        break;

      case RewardType.ITEM:
        this.validateItemId(data.id);
        await this.rewardRepository.addUserItem(userId, data.id, data.quantity);
        break;

      case RewardType.COUPON:
        this.validateCouponId(data.id);
        await this.rewardRepository.addUserCoupon(
          userId,
          data.id,
          data.quantity,
        );
        break;

      default:
        await this.rewardRepository.createUserRewardHistory(
          userId,
          rewardId,
          eventId,
          UserRewardRequestHistoryStatus.FAILED,
        );
        throw new BadRequestException('불명확한 리워드 타입입니다.');
    }

    await this.rewardRepository.createUserRewardHistory(
      userId,
      rewardId,
      eventId,
      UserRewardRequestHistoryStatus.SUCCESS,
    );
  }

  validateItemId(itemId: string) {
    const exists = ItemTable.some((item) => item._id === itemId);
    if (!exists) {
      throw new NotFoundException('존재하지 않는 아이템입니다.');
    }
  }

  validateCouponId(couponId: string) {
    const exists = CouponTable.some((coupon) => coupon._id === couponId);
    if (!exists) {
      throw new NotFoundException('존재하지 않는 아이템입니다.');
    }
  }

  async getAllRewardRequestHistoryList(page: number, pageSize: number) {
    const { rewardList, totalCount } =
      await this.rewardRepository.getAllRewardRequestHistoryList(
        page,
        pageSize,
      );

    return { rewardList, totalCount };
  }

  async getUserRewardRequestHistoryList(
    userId: string,
    page: number,
    pageSize: number,
  ) {
    const { rewardList, totalCount } =
      await this.rewardRepository.getUserRewardRequestHistoryList(
        userId,
        page,
        pageSize,
      );

    return { rewardList, totalCount };
  }
}
