import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

export type CategoryDocument = mongoose.Document<Category>;

@Schema({ collection: 'Category', versionKey: false })
export class Category {
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

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.set('toObject', { virtuals: true });
CategorySchema.set('toJSON', { virtuals: true });
