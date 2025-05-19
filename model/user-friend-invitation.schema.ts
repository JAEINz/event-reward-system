import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserFriendInvitations {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  phoneNumber: string;
}

export const UserFriendInvitationSchema = SchemaFactory.createForClass(
  UserFriendInvitations,
);
export type UserFriendInvitationsDocument = UserFriendInvitations & Document;
