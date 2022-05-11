import { Product, ProductSchema } from './schemas/products.schema';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from './product.repository';
import product from './mocks/product';

describe('Test products repository', () => {
  let app: INestApplication;
  let repo: ProductRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(
          'mongodb://localhost:27017/Products?authSource=admin',
          {
            useNewUrlParser: true,
            user: 'root',
            pass: 'root',
          },
        ),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      providers: [ProductRepository],
    }).compile();

    app = module.createNestApplication();

    repo = module.get<ProductRepository>(ProductRepository);

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  afterEach(async () => {
    const refreshDatabase = () =>
      repo['productDBProvider'].deleteMany({}).exec();
    await refreshDatabase();
  });

  it('should be defined', () => {
    expect.assertions(2);

    expect(app).toBeDefined();
    expect(repo).toBeDefined();
  });

  it('should return record when search By id or null if not exists', async () => {
    expect.assertions(2);
    const { title, description, price, image } = product;
    await repo.save({ title, description, price, image });
    const result = await repo.getOne('123');
    expect(result).toEqual(undefined);

    const secondResult = await repo.getOne(title);

    expect(secondResult).toEqual(
      expect.objectContaining({
        title,
        description,
        price,
        image,
      }),
    );
  });

  it('should return all record', async () => {
    expect.assertions(4);
    const mock = [
      {
        title: 'title1',
        description: 'description1',
        price: 100,
        image: 'image1',
      },
      {
        title: 'title2',
        description: 'description2',
        price: 200,
        image: 'image2',
      },
      {
        title: 'title3',
        description: 'description3',
        price: 300,
        image: 'image3',
      },
    ];
    await repo.save(mock[0]);
    await repo.save(mock[1]);
    await repo.save(mock[2]);
    const result = await repo.getAll();
    expect(result.length).toEqual(3);
    result.forEach((res, index) => {
      expect(res).toEqual(expect.objectContaining(mock[index]));
    });
  });

  it('should remove record', async () => {
    expect.assertions(2);

    const { title, description, price, image } = product;
    await repo.save({ title, description, price, image });
    let result = await repo.getAll();
    expect(result.length).toEqual(1);

    await repo.remove(result[0]['_id']);
    const getAll = await repo.getAll();
    expect(getAll.length).toEqual(0);
  });
});
