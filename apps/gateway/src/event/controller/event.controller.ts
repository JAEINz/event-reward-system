import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Roles } from 'apps/gateway/libs/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'apps/gateway/libs/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'apps/gateway/libs/auth/guard/roles.guard';
import {
  GetAllEventListGetResponseDto,
  GetAllEventListRequestDto,
} from 'apps/gateway/libs/shared/dto/event';
import { EventTable } from 'apps/gateway/libs/shared/dto/event/type';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';

@Controller('event')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly httpService: HttpService) {}

  @Get('list/all')
  @Roles('OPERATOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[관리자] 이벤트 전체 리스트 조회 API',
  })
  @ApiOkResponse({ type: GetAllEventListGetResponseDto })
  async getEventList(@Query() requestDto: GetAllEventListRequestDto) {
    const { page, pageSize } = requestDto;
    const observable = this.httpService.get(
      `http://localhost:3002/event/list/all?page=${page}&pageSize=${pageSize}`,
    );
    const response: AxiosResponse<{
      eventList: EventTable[];
      totalCount: number;
    }> = await firstValueFrom(observable);

    return GetAllEventListGetResponseDto.of(
      response.data.eventList,
      response.data.totalCount,
    );
  }
}
