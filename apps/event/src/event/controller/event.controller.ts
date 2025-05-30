import { Body, Controller, Get, Post, Query, Headers } from '@nestjs/common';
import { EventService } from '../service/event.service';
import {
  CreateEventRequestDto,
  GetAllEventListRequestDto,
} from 'apps/libs/dto/event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get('list/all')
  async getAllEventList(@Query() requestDto: GetAllEventListRequestDto) {
    const { page, pageSize } = requestDto;
    const { eventList, totalCount } = await this.eventService.getAllEventList(
      page,
      pageSize,
    );

    return { eventList, totalCount };
  }

  @Post()
  createEvent(
    @Headers('user-id') userId: string,
    @Body() requestDto: CreateEventRequestDto,
  ) {
    const { title, status, startDate, endDate } = requestDto;

    return this.eventService.createEvent(
      userId,
      title,
      status,
      startDate,
      endDate,
    );
  }
}
