import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

export type OptionDocument = mongoose.Document<Option>;

@Schema({ collection: 'Option', versionKey: false })
export class Option {
  @Prop({ required: true })
  title: string;
}
export const OptionSchema = SchemaFactory.createForClass(Option);

OptionSchema.virtual('products', {
  ref: 'ProductToOption',
  localField: '_id',
  foreignField: 'optionId',
});

OptionSchema.set('toObject', { virtuals: true });
OptionSchema.set('toJSON', { virtuals: true });
