import { Test, TestingModule } from '@nestjs/testing';
import { ProductToCategoryRepository } from '../product-to-category/product-to-category.repository';
import { CategoryRepository } from '../category/category.repository';
import { productRepositoryMock } from './mocks/ProductRepositoryMock';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';
import { CategoryRepositoryMock } from '../category/mocks/CategoryRepositoryMock';
import { productToCategoryRepositoryMock } from '../product-to-category/mocks/ProductToCategoryRepositoryMock';

describe('ProductService', () => {
  let service;
  let poductRepo;
  let categoryRepo;
  let productToCategoryRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useFactory: productRepositoryMock },
        { provide: CategoryRepository, useClass: CategoryRepositoryMock },
        {
          provide: ProductToCategoryRepository,
          useFactory: productToCategoryRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    poductRepo = module.get<ProductRepository>(ProductRepository);
    categoryRepo = module.get<CategoryRepository>(CategoryRepository);
    productToCategoryRepo = module.get<ProductToCategoryRepository>(
      ProductToCategoryRepository,
    );
  });

  it('should be defined', () => {
    expect.assertions(4);

    expect(service).toBeDefined();
    expect(poductRepo).toBeDefined();
    expect(categoryRepo).toBeDefined();
    expect(productToCategoryRepo).toBeDefined();
  });

  it('createProduct without category_id', async () => {
    expect.assertions(2);

    poductRepo.createProduct.mockResolvedValue({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
    });

    const result = await service.createProduct({
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
    });

    expect(poductRepo.createProduct).toHaveBeenCalled();

    expect(result).toEqual({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
    });
  });

  it('createProduct with category_id', async () => {
    expect.assertions(2);

    poductRepo.createProduct.mockResolvedValue({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
    });

    productToCategoryRepo.createProduct.mockResolvedValue({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
    });

    const result = await service.createProduct({
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
      category_id: 1,
    });

    expect(poductRepo.createProduct).toHaveBeenCalled();

    expect(result).toEqual({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
    });
  });
});
