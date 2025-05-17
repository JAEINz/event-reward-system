import { Injectable } from '@nestjs/common';
import { EventRepository } from '../repository/event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async getAllEventList(page: number, pageSize: number) {
    const { eventList, totalCount } =
      await this.eventRepository.getAllEventList(page, pageSize);

    return { eventList, totalCount };
  }
}
