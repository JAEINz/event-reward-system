import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: String,
    enum: ['USER', 'OPERATOR', 'AUDITOR', 'ADMIN'],
    default: 'USER',
  })
  roles: string;

  @Prop()
  refreshToken: string;
}

export const UserSchema = SchemaFactory.createForClass(Users);
export type UsersDocument = Users & Document;
