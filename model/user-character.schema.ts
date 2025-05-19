import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserCharacters {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ default: 0, required: true })
  exp: number;

  @Prop({ default: 0, required: true })
  point: number;
}

export const UserCharacterSchema = SchemaFactory.createForClass(UserCharacters);
export type UserCharactersDocument = UserCharacters & Document;
