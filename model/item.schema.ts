import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Items {
  @Prop({ required: true })
  name: string;
}

export const ItemSchema = SchemaFactory.createForClass(Items);
export type ItemDocument = Items & Document;
