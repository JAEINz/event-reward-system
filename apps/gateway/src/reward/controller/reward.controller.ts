import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { Roles } from 'apps/gateway/libs/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'apps/gateway/libs/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'apps/gateway/libs/auth/guard/roles.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { AddRewardRequestDto } from '../dto';
import { firstValueFrom } from 'rxjs';

@Controller('reward')
@UseGuards(JwtAuthGuard, RolesGuard)
export class RewardController {
  constructor(private readonly httpService: HttpService) {}

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[관리자, 운영자] 이벤트 보상 등록 API',
  })
  @ApiCreatedResponse({ type: String })
  async addReward(@Body() requestDto: AddRewardRequestDto) {
    await firstValueFrom(
      this.httpService.post(`http://localhost:3002/reward`, requestDto),
    );

    return { status: 'OK' };
  }
}
