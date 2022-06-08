import { lineDelimiter } from './../../../helpers/index';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { SaveProductToOptionDto } from '../dto/save-product-option.dto';
import { UpdateProductOptionDto } from '../dto/update-product-option.dto';
import { ProductToOption } from '../schemas/product-to-option.schema';

@Injectable()
export class ProductToOptionRepository {
  constructor(
    @InjectModel(ProductToOption.name)
    private readonly productToOptionDBProvider: Model<ProductToOption>,
  ) {}

  private readonly logger = new Logger(ProductToOption.name);

  async save(
    saveProductToOptionDto: SaveProductToOptionDto,
  ): Promise<ProductToOption> {
    const { optionId, productId } = saveProductToOptionDto;

    const prefix = `[Product ID: ${productId}][OPTION ID: ${optionId}]`;

    try {
      this.logger.log(`${prefix} SAVING START`);

      const result = await this.productToOptionDBProvider
        .findOneAndUpdate(
          { productId, optionId },
          { productId, optionId },
          { new: true, upsert: true },
        )
        .lean()
        .exec();

      this.logger.log(`${prefix} SAVING SUCCESS`);
      lineDelimiter();

      return result;
    } catch (e) {
      this.logger.error(`${prefix} SAVING ERROR: ${e.message}`);
      lineDelimiter();
    }
  }

  async getAllById(
    id: Types.ObjectId,
    type: 'optionId' | 'productId',
  ): Promise<ProductToOption[]> {
    const prefix = `[${type}: ${id}]`;

    try {
      this.logger.log(`${prefix} GET ALL BY ID START`);
      const result = await this.productToOptionDBProvider
        .find({ [type]: id })
        .lean()
        .exec();

      this.logger.log(`${prefix} GET ALL BY ID SUCCESS`);
      lineDelimiter();

      return result;
    } catch (e) {
      this.logger.error(`${prefix} GET ALL BY ID ERROR: ${e.message}`);
      lineDelimiter();
    }
  }

  async saveMany(payload: ProductToOption[]): Promise<ProductToOption[]> {
    const prefix = payload.reduce(
      (acc, item) =>
        `${acc} [Product IDs: ${item.productId}][OPTION ID: ${item.optionId}]`,
      '',
    );

    try {
      this.logger.log(`${prefix} SAVING MANY START`);

      const result = await this.productToOptionDBProvider.insertMany(payload);

      this.logger.log(`${prefix} SAVING MANY SUCCESS`);
      lineDelimiter();

      return result;
    } catch (e) {
      this.logger.error(`${prefix} SAVING MANY ERROR: ${e.message}`);
      lineDelimiter();
    }
  }

  async removeById(id: Types.ObjectId): Promise<void> {
    const prefix = `[REMOVE BY ID: ${id}]`;

    try {
      this.logger.log(`${prefix} REMOVE BY ID START`);
      await this.productToOptionDBProvider.findByIdAndDelete(id);
      this.logger.log(`${prefix} REMOVE BY ID SUCCESS`);
      lineDelimiter();
    } catch (e) {
      this.logger.error(`${prefix} REMOVE BY ID ERROR: ` + e.message);
      lineDelimiter();
    }
  }

  async remove(saveProductToOptionDto: SaveProductToOptionDto): Promise<void> {
    const { productId, optionId } = saveProductToOptionDto;
    const prefix = `${productId ? `[PRODUCT ID: ${productId}]` : ''} ${
      optionId ? `[CATEGORY ID: ${optionId}]` : ''
    }`;

    try {
      this.logger.log(`${prefix} REMOVE START`);
      await this.productToOptionDBProvider.remove({
        productId,
        optionId,
      });
      this.logger.log(`${prefix} REMOVE SUCCESS`);
      lineDelimiter();
    } catch (e) {
      this.logger.error(`${prefix} REMOVE ERROR: ` + e.message);
      lineDelimiter();
    }
  }
}
