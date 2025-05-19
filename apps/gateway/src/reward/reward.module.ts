import { Module } from '@nestjs/common';

import { RewardController } from './controller/reward.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [RewardController],
  providers: [],
  exports: [],
})
export class RewardModule {}
