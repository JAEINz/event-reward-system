import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class UserRewardRequestHistory {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  userId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Events' })
  eventId: string;

  @Prop({ required: true })
  rewardId: string;

  @Prop({ enum: ['FAILED', 'SUCCESS'], required: true })
  status: string;
}

export const UserRewardRequestHistorySchema = SchemaFactory.createForClass(
  UserRewardRequestHistory,
);
export type UserRewardRequestHistoryDocument = UserRewardRequestHistory &
  Document;
