import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Coupons {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  code: string;
}

export const CouponSchema = SchemaFactory.createForClass(Coupons);
export type CouponDocument = Coupons & Document;
