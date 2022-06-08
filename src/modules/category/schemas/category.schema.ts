import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CategoryDocument = mongoose.Document<Category>;

@Schema({ collection: 'Category', versionKey: false })
export class Category {
  @Prop({ required: true })
  title: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.virtual('products', {
  ref: 'ProductToCategory',
  localField: '_id',
  foreignField: 'categoryId',
});

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });
