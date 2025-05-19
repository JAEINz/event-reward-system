import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserCharacters {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ default: 0 })
  exp: number;

  @Prop({ default: 0 })
  point: number;

  @Prop({ enum: ['ACTIVE', 'SUSPENDED', 'DELETED'], default: 'ACTIVE' })
  status: string;
}

export const UserCharacterSchema = SchemaFactory.createForClass(UserCharacters);
