import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Events, EventDocument } from '../../../../../model/event.schema';
import { EventStatus } from 'apps/libs/enum/event.enum';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Events.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async getAllEventList(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [eventList, totalCount] = await Promise.all([
      this.eventModel
        .find()
        .skip(skip)
        .limit(pageSize)
        .populate('userId', 'email')
        .exec(),
      this.eventModel.countDocuments().exec(),
    ]);

    return { eventList, totalCount };
  }

  createEvent(
    userId: string,
    title: string,
    status: EventStatus,
    startDate: string,
    endDate: string,
  ) {
    return this.eventModel.create({
      userId: new Types.ObjectId(userId),
      title,
      status,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
  }
}
