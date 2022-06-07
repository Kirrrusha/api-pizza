import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = mongoose.Document<Product>;

@Schema({
  collection: 'Product',
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  autoCreate: true,
})
export class Product {
  @Prop({ required: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('categories', {
  ref: 'ProductToCategory',
  localField: '_id',
  foreignField: 'categoryId',
});

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
