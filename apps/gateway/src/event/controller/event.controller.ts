import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { Roles } from 'apps/gateway/libs/auth/decorator/roles.decorator';
import { JwtAuthGuard } from 'apps/gateway/libs/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'apps/gateway/libs/auth/guard/roles.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';
import {
  CreateEventRequestDto,
  GetAllEventListRequestDto,
  GetAllEventListResponseDto,
} from '../dto';
import { EventTable } from '../dto/type';
import { Request } from 'express';
import { JwtUserPayload } from 'apps/gateway/libs/dto';

@Controller('event')
@UseGuards(JwtAuthGuard, RolesGuard)
export class EventController {
  constructor(private readonly httpService: HttpService) {}

  @Get('list/all')
  @Roles('OPERATOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[관리자, 운영자] 이벤트 전체 리스트 조회 API',
  })
  @ApiOkResponse({ type: GetAllEventListResponseDto })
  async getEventList(@Query() requestDto: GetAllEventListRequestDto) {
    const { page, pageSize } = requestDto;
    const observable = this.httpService.get(
      `http://localhost:3002/event/list/all?page=${page}&pageSize=${pageSize}`,
    );
    const response: AxiosResponse<{
      eventList: EventTable[];
      totalCount: number;
    }> = await firstValueFrom(observable);

    return GetAllEventListResponseDto.of(
      response.data.eventList,
      response.data.totalCount,
    );
  }

  @Post()
  @Roles('OPERATOR', 'ADMIN')
  @ApiBearerAuth()
  @ApiOperation({
    summary: '[관리자, 운영자] 이벤트 생성 API',
  })
  @ApiCreatedResponse({ type: String })
  async createEvent(
    @Req() req: Request,
    @Body() requestDto: CreateEventRequestDto,
  ) {
    const { userId } = req.user as JwtUserPayload;
    await firstValueFrom(
      this.httpService.post(`http://localhost:3002/event`, requestDto, {
        headers: { 'user-id': userId },
      }),
    );

    return { status: 'OK' };
  }
}
