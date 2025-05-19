import { Module } from '@nestjs/common';
import { RewardController } from './controller/reward.controller';
import { RewardService } from './service/reward.service';
import { RewardRepository } from './repository/reward.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardSchema } from 'model/reward.schema';
import { Rewards } from '../../../../model/reward.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserCoupons, UserCouponSchema } from 'model/user-coupon.schema';
import {
  UserFriendInvitations,
  UserFriendInvitationSchema,
} from 'model/user-friend-invitation.schema';
import { UserItems, UserItemSchema } from 'model/user-item.schema';
import {
  UserRewardRequestHistory,
  UserRewardRequestHistorySchema,
} from 'model/user-reward-request-history.schema';
import { Users, UserSchema } from 'model/user.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DB_URI'),
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: Rewards.name, schema: RewardSchema }]),
    MongooseModule.forFeature([
      {
        name: UserRewardRequestHistory.name,
        schema: UserRewardRequestHistorySchema,
      },
    ]),
    MongooseModule.forFeature([
      { name: UserFriendInvitations.name, schema: UserFriendInvitationSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserItems.name, schema: UserItemSchema },
    ]),
    MongooseModule.forFeature([
      { name: UserCoupons.name, schema: UserCouponSchema },
    ]),
    MongooseModule.forFeature([{ name: Users.name, schema: UserSchema }]),
  ],
  controllers: [RewardController],
  providers: [RewardService, RewardRepository],
  exports: [],
})
export class RewardModule {}
