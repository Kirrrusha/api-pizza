import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ProductDocument = mongoose.Document<Product>;

@Schema({ collection: 'Product', versionKey: false })
export class Product {
  @Prop({ required: true, immutable: true, timestamps: true })
  id: number;

  @Prop({ required: true })
  title: string;

  @Prop()
  image: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  //   @Prop()
  //   categories: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId;
  //       ref: 'Category';
  //     },
  //   ];

  //   @Prop()
  //   options: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId;
  //       ref: 'Option';
  //     },
  //   ];
}

export const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.set('toObject', { virtuals: true });
ProductSchema.set('toJSON', { virtuals: true });
