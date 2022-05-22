import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { SaveProductCategoryDto } from '../dto/save-product-category.dto';
import { ProductToCategory } from '../schemas/product-to-category.schema';
import { lineDelimiter } from './../../../helpers/index';

@Injectable()
export class ProductToCategoryRepository {
  constructor(
    @InjectModel(ProductToCategory.name)
    private readonly productToCategoryDBProvider: Model<ProductToCategory>,
  ) {}

  private readonly logger = new Logger(ProductToCategory.name);

  async save(
    saveProducCategorytDto: SaveProductCategoryDto,
  ): Promise<ProductToCategory> {
    const { productId, categoryId } = saveProducCategorytDto;
    const prefix = `[Product ID: ${productId}][Category ID: ${categoryId}]`;

    try {
      this.logger.log(`${prefix} SAVING START`);

      const result = await this.productToCategoryDBProvider
        .findOneAndUpdate(
          { productId, categoryId },
          { productId, categoryId },
          { new: true, upsert: true },
        )
        .lean()
        .exec();

      this.logger.log(`${prefix} SAVING SUCCESS`);
      lineDelimiter();

      return result;
    } catch (e) {
      this.logger.error(`${prefix} Save error: ${e.message}`);
      lineDelimiter();
    }
  }

  async removeById(id: Types.ObjectId): Promise<void> {
    const prefix = `[Mongo ID: ${id}]`;

    try {
      this.logger.log(`${prefix} REMOVE BY ID START`);
      await this.productToCategoryDBProvider.findByIdAndDelete(id);
      this.logger.log(`${prefix} REMOVE BY ID SUCCESS`);
      lineDelimiter();
    } catch (e) {
      this.logger.error(`${prefix} REMOVE BY ID ERROR: ` + e.message);
      lineDelimiter();
    }
  }

  async remove(saveProducCategorytDto: SaveProductCategoryDto): Promise<void> {
    const { productId, categoryId } = saveProducCategorytDto;
    const prefix = `${productId ? `[PRODUCT ID: ${productId}]` : ''} ${
      categoryId ? `[CATEGORY ID: ${categoryId}]` : ''
    }`;

    try {
      this.logger.log(`${prefix} REMOVE START`);
      await this.productToCategoryDBProvider.remove({
        productId,
        categoryId,
      });
      this.logger.log(`${prefix} REMOVE SUCCESS`);
      lineDelimiter();
    } catch (e) {
      this.logger.error(`${prefix} REMOVE ERROR: ` + e.message);
      lineDelimiter();
    }
  }
}
