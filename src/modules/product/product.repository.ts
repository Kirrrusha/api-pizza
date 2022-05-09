import { lineDelimiter } from './../../helpers/index';
import { Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { SaveProductDto } from './dto/save-product.dto';
import { NotFoundException } from '@nestjs/common';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './schemas/products.schema';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productDBProvider: Model<Product>,
  ) {}

  async getAll(): Promise<Product[]> {
    const products = await this.productDBProvider.find().exec();
    return products;
  }

  async save(createProductDto: SaveProductDto): Promise<Product> {
    const { title, description, price, image, id } = createProductDto;
    const prefix = `[Product name: ${title}][Mongo ID: ${id}]`;

    Logger.log(`${prefix} SAVING`);

    try {
      const res = await this.productDBProvider
        .updateOne(
          {
            $or: [{ title }, { _id: id }],
          },
          { title, description, price, image },
          {
            upsert: true,
          },
        )
        .lean()
        .exec();

      Logger.log(`${prefix} SUCCESS`);
      lineDelimiter();

      return res as unknown as Product;
    } catch (e) {
      Logger.error(`${prefix} Save error: ` + e.message);
      lineDelimiter();
    }
  }

  async remove(id: string): Promise<void> {
    await this.productDBProvider.findByIdAndDelete(id);
  }

  async getOne(id: string): Promise<Product> {
    try {
      const found = await this.productDBProvider.findById(id);

      if (!found) {
        throw new NotFoundException(`Task with ID "${id}" not found`);
      }

      return found;
    } catch (e) {}
  }
}
