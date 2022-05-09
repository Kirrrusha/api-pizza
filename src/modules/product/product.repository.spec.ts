import { Product, ProductSchema } from './schemas/products.schema';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductRepository } from './product.repository';

// jest.setTimeout(30000);
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

  //   afterAll(async () => {
  //     await app.close();
  //   });

  it('should be defined', () => {
    expect(app).toBeDefined();
    expect(repo).toBeDefined();
  });
});
