import { lineDelimiter } from '../../../helpers/index';
import { Model, Types } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { SaveProductDto } from '../dto/save-product.dto';
import { NotFoundException } from '@nestjs/common';
import { Product } from '../schemas/products.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productDBProvider: Model<Product>,
  ) {}

  private readonly logger = new Logger(Product.name);

  async getAll(): Promise<Product[]> {
    try {
      this.logger.log('GET_ALL PENDEING');
      const products = await this.productDBProvider
        .find()
        .populate('categories')
        .exec();
      this.logger.log('GET_ALL SUCCESS');
      lineDelimiter();

      return products;
    } catch (error) {
      this.logger.error(`GET_ALL ERROR: ${error.message}`);
      lineDelimiter();
    }
  }

  async save(saveProductDto: SaveProductDto): Promise<Product> {
    const { title, description, price, image, id } = saveProductDto;
    const prefix = `[Product name: ${title}][Mongo ID: ${id}]`;

    Logger.log(`${prefix} SAVING`);

    try {
      const result = await this.productDBProvider
        .findOneAndUpdate(
          {
            $or: [{ title }, { _id: id }],
          },
          {
            title,
            description,
            price,
            image,
          },
          {
            upsert: true,
          },
        )
        .lean()
        .exec();

      Logger.log(`${prefix} SUCCESS`);
      lineDelimiter();

      return result;
    } catch (e) {
      Logger.error(`${prefix} SAVE ERROR: ${e.message}`);
      lineDelimiter();
    }
  }

  async remove(id: Types.ObjectId): Promise<void> {
    const prefix = `[MONGO ID: ${id}]`;

    try {
      this.logger.log(`${prefix} REMOVE START`);
      await this.productDBProvider.findByIdAndDelete(id);
      this.logger.log(`${prefix} REMOVE SUCCESS`);
      lineDelimiter();
    } catch (error) {
      this.logger.error(`${prefix} REMOVE ERROR: ${error.message}`);
      lineDelimiter();
    }
  }

  async getOneByTitle(title: string): Promise<Product> {
    const prefix = `[TITLE RECORD: ${title}]`;

    try {
      this.logger.log(`${prefix} GET_ONE_BY_TITLE START`);

      const found = await this.productDBProvider
        .findOne({ title })
        .populate('categories')
        .exec();

      this.logger.log(`${prefix} GET_ONE_BY_TITLE SUCCESS`);
      lineDelimiter();
      return found;
    } catch (e) {
      this.logger.error(`${prefix} GET_ONE_BY_TITLE ERROR: ${e.message}`);
      lineDelimiter();
    }
  }
}
