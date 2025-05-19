import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class UserItems {
  @Prop({ type: Types.ObjectId, ref: 'Item', required: true })
  itemId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Item', required: true })
  characterId: Types.ObjectId;
}

export const UserItemSchema = SchemaFactory.createForClass(UserItems);
export type UserItemDocument = UserItems & Document;
