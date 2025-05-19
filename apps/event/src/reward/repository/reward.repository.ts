import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  ConditionType,
  RewardType,
  UserRewardRequestHistoryStatus,
} from 'apps/libs/enum';
import { InjectModel } from '@nestjs/mongoose';
import { Rewards, RewardsDocument } from 'model/reward.schema';
import { Model } from 'mongoose';
import {
  UserRewardRequestHistory,
  UserRewardRequestHistoryDocument,
} from 'model/user-reward-request-history.schema';
import {
  UserFriendInvitations,
  UserFriendInvitationsDocument,
} from 'model/user-friend-invitation.schema';
import { UserItems, UserItemsDocument } from 'model/user-item.schema';
import { UserCoupons, UserCouponsDocument } from 'model/user-coupon.schema';
import { Users, UsersDocument } from 'model/user.schema';

@Injectable()
export class RewardRepository {
  constructor(
    @InjectModel(Rewards.name)
    private readonly rewardModel: Model<RewardsDocument>,
    @InjectModel(UserRewardRequestHistory.name)
    private readonly userRewardRequestHistoryModel: Model<UserRewardRequestHistoryDocument>,
    @InjectModel(Users.name)
    private readonly userModel: Model<UsersDocument>,
    @InjectModel(UserFriendInvitations.name)
    private readonly userFriendInvitationsModel: Model<UserFriendInvitationsDocument>,
    @InjectModel(UserItems.name)
    private readonly userItemsModel: Model<UserItemsDocument>,
    @InjectModel(UserCoupons.name)
    private readonly userCouponsModel: Model<UserCouponsDocument>,
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

  async validateUserRewardRequestHistory(userId: string, rewardId: string) {
    const userRewardRequestHistory =
      await this.userRewardRequestHistoryModel.findOne({
        userId,
        rewardId,
        status: UserRewardRequestHistoryStatus.SUCCESS,
      });

    if (userRewardRequestHistory) {
      await this.createUserRewardHistory(
        userId,
        rewardId,
        UserRewardRequestHistoryStatus.FAILED,
      );
      throw new ConflictException('이미 수령된 리워드입니다.');
    }
  }

  async getRewardByRewardId(rewardId: string) {
    const reward = await this.rewardModel.findById(rewardId);

    if (!reward) {
      throw new NotFoundException('존재하지 않는 리워드 입니다.');
    }

    return reward;
  }

  async getUserCharacterExpByUserId(userId: string) {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new NotFoundException('존재하지 않는 유저입니다.');
    }

    return { exp: user.exp };
  }

  getUserFriendInvitationCount(userId: string) {
    return this.userFriendInvitationsModel.countDocuments({ userId });
  }

  async updateUserPoint(userId: string, quantity: number) {
    await this.userModel.updateOne(
      { _id: userId },
      { $inc: { point: quantity } },
    );
  }

  async addUserItem(userId: string, itemId: string, quantity: number) {
    const itemsToCreate = Array.from({ length: quantity }, () => ({
      userId,
      itemId,
    }));

    await this.userItemsModel.insertMany(itemsToCreate);
  }

  async addUserCoupon(userId: string, couponId: string, quantity: number) {
    const couponsToCreate = Array.from({ length: quantity }, () => ({
      userId,
      couponId,
    }));

    await this.userCouponsModel.insertMany(couponsToCreate);
  }

  async createUserRewardHistory(
    userId: string,
    rewardId: string,
    status: UserRewardRequestHistoryStatus,
  ) {
    await this.userRewardRequestHistoryModel.create({
      userId,
      rewardId,
      status,
    });
  }
}
