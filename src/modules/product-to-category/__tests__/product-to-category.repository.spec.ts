import { INestApplication } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Types } from 'mongoose';

import { Product, ProductSchema } from '../../product/schemas/products.schema';
import { ProductToCategoryRepository } from '../repo/product-to-category.repository';
import {
  ProductToCategory,
  ProductToCategorySchema,
} from '../schemas/product-to-category.schema';

describe('Test product-to-category repository', () => {
  let app: INestApplication;
  let repo: ProductToCategoryRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb://localhost:27017/Pizza?authSource=admin',
          {
            useNewUrlParser: true,
            user: 'root',
            pass: 'root',
            autoIndex: true,
            autoCreate: true,
          },
        ),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
          { name: ProductToCategory.name, schema: ProductToCategorySchema },
        ]),
      ],
      providers: [ProductToCategoryRepository],
    }).compile();

    app = module.createNestApplication();
    repo = module.get<ProductToCategoryRepository>(ProductToCategoryRepository);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    const refreshDatabase = () =>
      repo['productToCategoryDBProvider'].deleteMany({}).exec();
    await refreshDatabase();
  });

  it('should be defined', () => {
    expect.assertions(2);

    expect(app).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('should save record return result', async () => {
    const productId = new Types.ObjectId();
    const categoryId = new Types.ObjectId();
    const result = await repo.save({ productId, categoryId });

    expect(result).toEqual(
      expect.objectContaining({
        productId,
        categoryId,
      }),
    );
  });

  it('should remove record by mongoId', async () => {
    const productId = new Types.ObjectId();
    const categoryId = new Types.ObjectId();
    const result = await repo.save({ productId, categoryId });

    await repo.removeById(result['_id']);

    const record = await repo['productToCategoryDBProvider'].collection.findOne(
      {
        productId,
        categoryId,
      },
    );

    expect(record).toBeFalsy();
  });

  it('should remove record by product id', async () => {
    const productId = new Types.ObjectId();

    await repo.remove({ productId });

    const record = await repo['productToCategoryDBProvider'].collection.findOne(
      {
        productId,
      },
    );

    expect(record).toBeFalsy();
  });

  it('should remove record by category id', async () => {
    const categoryId = new Types.ObjectId();

    await repo.remove({ categoryId });

    const record = await repo['productToCategoryDBProvider'].collection.findOne(
      {
        categoryId,
      },
    );

    expect(record).toBeFalsy();
  });

  it('should remove record by category id and category id', async () => {
    const productId = new Types.ObjectId();
    const categoryId = new Types.ObjectId();

    await repo.remove({ productId, categoryId });

    const record = await repo['productToCategoryDBProvider'].collection.findOne(
      {
        productId,
        categoryId,
      },
    );

    expect(record).toBeFalsy();
  });
});
