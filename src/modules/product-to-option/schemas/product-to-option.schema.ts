import { SchemaTypes, Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Product } from './../../product/schemas/products.schema';
import { Option } from './../../option/schemas/option.schema';

export type ProductToOptionDocument = Document<Option>;

@Schema({ collection: 'ProductToOption', versionKey: false })
export class ProductToOption {
  @Prop({ type: SchemaTypes.ObjectId, ref: Product.name, required: true })
  productId: Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: Option.name, required: true })
  optionId: Types.ObjectId;
}

export const ProductToOptionSchema = SchemaFactory.createForClass(Option);

ProductToOptionSchema.set('toObject', { virtuals: true });
ProductToOptionSchema.set('toJSON', { virtuals: true });
