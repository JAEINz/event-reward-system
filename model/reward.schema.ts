import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import mongoose from 'mongoose';

export type RewardsDocument = Rewards & Document;

type RewardData = {
  id: string;
  targetQuantity: number;
};

@Schema({ timestamps: true })
export class Rewards {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'events', required: true })
  eventId: string;

  @Prop({ required: true, enum: ['EXP', 'FRIEND_INVITATION'] })
  conditionType: string;

  @Prop({ required: true })
  targetCount: number;

  @Prop({
    required: true,
    enum: ['ITEM', 'POINT', 'COUPON'],
  })
  rewardType: string;

  @Prop({
    required: true,
    type: {
      id: String,
      targetQuantity: Number,
    },
  })
  data: RewardData;
}

export const RewardSchema = SchemaFactory.createForClass(Rewards);
