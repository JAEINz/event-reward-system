import { Module } from '@nestjs/common';

import { UserController } from './controller/user.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [UserController],
  providers: [],
  exports: [],
})
export class UserModule {}
