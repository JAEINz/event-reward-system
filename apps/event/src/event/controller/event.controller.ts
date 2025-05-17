import { Controller, Get, Query } from '@nestjs/common';
import { GetAllEventListRequestDto } from 'apps/gateway/libs/shared/dto/event';
import { EventService } from '../service/event.service';

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
}
