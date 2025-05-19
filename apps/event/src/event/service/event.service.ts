import { Injectable } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';
import { EventStatus } from 'apps/gateway/libs/enum/event.enum';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getAllEventList(page: number, pageSize: number) {
    const { eventList, totalCount } =
      await this.eventRepository.getAllEventList(page, pageSize);

    return { eventList, totalCount };
  }

  createEvent(
    userId: string,
    title: string,
    status: EventStatus,
    conditionType: string,
    conditionQuantity: number,
    startDate: string,
    endDate: string,
  ) {
    return this.eventRepository.createEvent(
      userId,
      title,
      status,
      conditionType,
      conditionQuantity,
      startDate,
      endDate,
    );
  }
}
