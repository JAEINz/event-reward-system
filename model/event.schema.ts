import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Event {
  @Prop({ required: true })
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

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
