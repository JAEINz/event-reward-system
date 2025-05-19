import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    required: true,
    type: String,
    enum: ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'],
    default: 'USER',
  })
  roles: string;

  @Prop({ default: 0, required: true })
  exp: number;

  @Prop({ default: 0, required: true })
  point: number;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
export type UsersDocument = Users & Document;
