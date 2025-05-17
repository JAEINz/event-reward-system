import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Events {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true })
  userId: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  imageUrl: string;

  @Prop({ enum: ['ACTIVE', 'SUSPENDED', 'DELETED'], default: 'ACTIVE' })
  status: string;

  @Prop()
  conditionType: string;

  @Prop()
  conditionQuantity: number;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Events);

export type EventDocument = Events & Document;
