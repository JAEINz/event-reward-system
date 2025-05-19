import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum CouponStatus {
  AVAILABLE = 'AVAILABLE',
  UNAVAILABLE = 'UNAVAILABLE',
  USED = 'USED',
}

@Schema({ timestamps: true })
export class UserCoupons {
  @Prop({ type: Types.ObjectId, ref: 'Coupon', required: true })
  couponId: Types.ObjectId;

  @Prop({ enum: CouponStatus, default: CouponStatus.AVAILABLE })
  status: CouponStatus;
}

export const UserCouponSchema = SchemaFactory.createForClass(UserCoupons);
export type UserCouponDocument = UserCoupons & Document;
