import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../libs/auth/jwt/jwt.strategy';
import { JwtAuthGuard } from '../libs/auth/guard/jwt-auth.guard';
import { RolesGuard } from '../libs/auth/guard/roles.guard';
import { EventModule } from './event/event.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { RewardModule } from './reward/reward.module';

@Module({
  imports: [
    EventModule,
    RewardModule,
    PassportModule,
    HttpModule,
    JwtModule.register({}),
    ConfigModule.forRoot({ isGlobal: true }),
  ],
  providers: [JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [JwtAuthGuard, RolesGuard],
})
export class AppModule {}
