import { Module } from '@nestjs/common';
import { RewardController } from './controller/reward.controller';
import { RewardService } from './service/reward.service';
import { RewardRepository } from './repository/reward.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { RewardSchema } from 'model/reward.schema';
import { Rewards } from '../../../../model/reward.schema';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
  ],
  controllers: [RewardController],
  providers: [RewardService, RewardRepository],
  exports: [],
})
export class RewardModule {}
