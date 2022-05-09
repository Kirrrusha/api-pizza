import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

export type OptionDocument = mongoose.Document<Option>;

@Schema({ collection: 'Option', versionKey: false })
export class Option {
  @Prop({ required: true, immutable: true, timestamps: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  products: [
    {
      type: mongoose.Schema.Types.ObjectId;
      ref: 'Product';
    },
  ];
}

export const OptionSchema = SchemaFactory.createForClass(Option);

OptionSchema.set('toObject', { virtuals: true });
OptionSchema.set('toJSON', { virtuals: true });
