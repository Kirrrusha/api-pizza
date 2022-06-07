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

  it('should be save many and update item return result', async () => {
    expect.assertions(3);
    const productId1 = new Types.ObjectId();
    const categoryId1 = new Types.ObjectId();

    await repo.save({ productId: productId1, categoryId: categoryId1 });

    const productId2 = new Types.ObjectId();
    const categoryId2 = new Types.ObjectId();

    const payload = [
      { productId: productId1, categoryId: categoryId2 },
      { productId: productId2, categoryId: categoryId2 },
    ];
    const result = await repo.saveMany(payload);

    result.forEach((item, index) => {
      expect(item).toEqual(expect.objectContaining(payload[index]));
    });

    expect(result.length).toEqual(payload.length);
  });

  it('should return all by productId', async () => {
    const productId1 = new Types.ObjectId();
    const productId2 = new Types.ObjectId();
    const categoryId1 = new Types.ObjectId();
    const categoryId2 = new Types.ObjectId();
    const categoryId3 = new Types.ObjectId();

    const payload = [
      { productId: productId1, categoryId: categoryId1 },
      { productId: productId1, categoryId: categoryId2 },
      { productId: productId1, categoryId: categoryId3 },
      { productId: productId2, categoryId: categoryId3 },
    ];

    await repo.saveMany(payload);
    const result = await repo.getAllById(productId1, 'productId');

    result.forEach((item) => {
      expect(item).toEqual(expect.objectContaining({ productId: productId1 }));
    });

    expect(result.length).toEqual(3);
  });
  it('should return all by categoryId', async () => {
    const categoryId1 = new Types.ObjectId();
    const categoryId2 = new Types.ObjectId();
    const productId1 = new Types.ObjectId();
    const productId2 = new Types.ObjectId();
    const productId3 = new Types.ObjectId();

    const payload = [
      { productId: productId1, categoryId: categoryId1 },
      { productId: productId1, categoryId: categoryId2 },
      { productId: productId2, categoryId: categoryId2 },
      { productId: productId3, categoryId: categoryId2 },
    ];

    await repo.saveMany(payload);
    const result = await repo.getAllById(categoryId2, 'categoryId');

    result.forEach((item) => {
      expect(item).toEqual(
        expect.objectContaining({ categoryId: categoryId2 }),
      );
    });

    expect(result.length).toEqual(3);
  });

  it('should be save many return result', async () => {
    const productId1 = new Types.ObjectId();
    const categoryId1 = new Types.ObjectId();

    const productId2 = new Types.ObjectId();
    const categoryId2 = new Types.ObjectId();

    const payload = [
      { productId: productId1, categoryId: categoryId1 },
      { productId: productId2, categoryId: categoryId2 },
    ];
    const result = await repo.saveMany(payload);
    result.forEach((item, index) => {
      expect(item).toEqual(expect.objectContaining(payload[index]));
    });
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
