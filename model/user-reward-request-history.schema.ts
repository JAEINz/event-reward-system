import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserRewardRequestHistory {
  @Prop({ required: true })
  characterId: string;

  @Prop({ required: true })
  eventId: string;

  @Prop({ enum: ['FAILED', 'SUCCESS'], required: true })
  status: string;
}

export const UserRewardRequestSchema = SchemaFactory.createForClass(
  UserRewardRequestHistory,
);
