import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events, EventDocument } from '../../../../../model/event.schema';

@Injectable()
export class EventRepository {
  constructor(
    @InjectModel(Events.name) private readonly eventModel: Model<EventDocument>,
  ) {}

  async getAllEventList(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [eventList, totalCount] = await Promise.all([
      this.eventModel
        .find({ status: { $ne: 'DELETED' } })
        .skip(skip)
        .limit(pageSize)
        .populate('userId', 'email')
        .exec(),
      this.eventModel.countDocuments({ status: { $ne: 'DELETED' } }).exec(),
    ]);
    console.log(eventList);

    return { eventList, totalCount };
  }
}
