import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class UserCharacter {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true, default: 1 })
  level: number;

  @Prop({ required: true, default: 0 })
  exp: number;

  @Prop()
  characterClass: string;

  @Prop({ default: 0 })
  gold: number;

  @Prop({ enum: ['ACTIVE', 'SUSPENDED', 'DELETED'], default: 'ACTIVE' })
  status: string;
}

export const UserCharacterSchema = SchemaFactory.createForClass(UserCharacter);
