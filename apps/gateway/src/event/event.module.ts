import { Module } from '@nestjs/common';

import { EventController } from './controller/event.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EventController],
  providers: [],
  exports: [],
})
export class EventModule {}
