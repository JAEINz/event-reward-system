import { EventStatus } from 'apps/libs/enum/event.enum';

interface UserSummary {
  _id: string;
  email: string;
}

export type EventTable = {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string | UserSummary;
  title: string;
  description: string;
  imageUrl: string;
  status: EventStatus;
  conditionType: string;
  conditionQuantity: number;
  startDate: Date;
  endDate: Date;
};
