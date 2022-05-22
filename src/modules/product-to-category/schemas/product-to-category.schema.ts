import { SchemaTypes, Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from '../../category/schemas/category.schema';
import { Product } from '../../product/schemas/products.schema';

export type ProductToCategoryDocument = Document<ProductToCategory>;

@Schema({
  collection: 'ProductToCategory',
  versionKey: false,
  timestamps: true,
  autoIndex: true,
  autoCreate: true,
})
export class ProductToCategory {
  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name, required: true })
  productId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Category.name, required: true })
  categoryId: Types.ObjectId;
}

export const ProductToCategorySchema =
  SchemaFactory.createForClass(ProductToCategory);

ProductToCategorySchema.set('toObject', { virtuals: true });
ProductToCategorySchema.set('toJSON', { virtuals: true });
