import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

// jest.setTimeout(30000);
describe('Test products repository', () => {
  let app: INestApplication;
  let repo: ProductRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: () => ({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres_password',
            database: 'postgres',
            synchronize: true,
            autoLoadEntities: true,
          }),
        }),
        TypeOrmModule.forFeature([ProductRepository]),
      ],
      providers: [],
    }).compile();

    app = module.createNestApplication();

    repo = module.get<ProductRepository>(ProductRepository);

    await app.init();
  });

  beforeEach(async () => {
    await repo.delete({});
  });
  afterAll(async () => {
    await app.close();
  });

  it('should be defined', async () => {
    expect(app).toBeDefined();
    expect(repo).toBeDefined();
  });
});
