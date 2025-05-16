import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../libs/auth/jwt/jwt.strategy';
import { JwtAuthGuard } from '../libs/auth/guard/jwt-auth.guard';
import { RolesGuard } from '../libs/auth/guard/roles.guard';

@Module({
  imports: [PassportModule, JwtModule.register({})],
  providers: [JwtStrategy, JwtAuthGuard, RolesGuard],
  exports: [JwtAuthGuard, RolesGuard],
})
export class AppModule {}
