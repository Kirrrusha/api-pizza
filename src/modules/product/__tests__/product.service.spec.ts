import { Types } from 'mongoose'
import { Test, TestingModule } from '@nestjs/testing'

import { ProductToCategoryRepository } from './../../product-to-category/repo/product-to-category.repository'
import { ProductToOptionRepository } from './../../product-to-option/repo/product-to-option.repository'
import { productRepositoryMock } from '../mocks/ProductRepositoryMock'
import { ProductRepository } from '../repo/product.repository'
import { ProductService } from '../services/product.service'
import { productToOptionRepositoryMock } from './../../product-to-option/mocks/ProductToOptionRepositoryMock'

/**
 * add tests each optional categoryIds and optionIds
 */

describe('ProductService', () => {
  let service
  let poductRepo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        { provide: ProductRepository, useFactory: productRepositoryMock },
        {
          provide: ProductToCategoryRepository,
          useFactory: productRepositoryMock
        },
        {
          provide: ProductToOptionRepository,
          useFactory: productToOptionRepositoryMock
        }
      ]
    }).compile()

    service = module.get<ProductService>(ProductService)
    poductRepo = module.get<ProductRepository>(ProductRepository)
  })

  it('should be defined', () => {
    expect.assertions(2)

    expect(service).toBeDefined()
    expect(poductRepo).toBeDefined()
  })

  it('save without categoryIds optionIds', async () => {
    expect.assertions(2)

    poductRepo.save.mockResolvedValue({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100
    })

    const result = await service.save({
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100
    })

    expect(poductRepo.save).toHaveBeenCalled()

    expect(result).toEqual({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100
    })
  })

  it('save with categoryIds and optionIds', async () => {
    expect.assertions(2)
    const categoryId = new Types.ObjectId()
    const optionId = new Types.ObjectId()
    poductRepo.save.mockResolvedValue({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
      categoryIds: [categoryId],
      optionIds: [optionId]
    })

    const result = await service.save({
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
      categoryIds: [categoryId],
      optionIds: [optionId]
    })

    expect(poductRepo.save).toHaveBeenCalled()

    expect(result).toEqual({
      id: 1,
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100,
      categoryIds: [categoryId],
      optionIds: [optionId]
    })
  })

  it('getAll', async () => {
    expect.assertions(2)

    poductRepo.getAll.mockResolvedValue([
      {
        id: 1,
        title: 'title1',
        image: 'image1',
        description: 'description1',
        price: 100
      },
      {
        id: 2,
        title: 'title2',
        image: 'image2',
        description: 'description2',
        price: 200
      }
    ])

    const result = await service.getAll()

    expect(poductRepo.getAll).toHaveBeenCalled()

    expect(result.length).toEqual(2)
  })

  it('remove', async () => {
    expect.assertions(2)

    poductRepo.remove.mockResolvedValue('123')

    const result = await service.remove('123')

    expect(poductRepo.remove).toHaveBeenCalledWith('123')

    expect(result).toEqual('123')
  })

  it('getOne', async () => {
    expect.assertions(2)

    poductRepo.getOneByTitle.mockResolvedValue({
      id: '123',
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100
    })

    const result = await service.getOne('123')

    expect(poductRepo.getOneByTitle).toHaveBeenCalledWith('123')

    expect(result).toEqual({
      id: '123',
      title: 'title1',
      image: 'image1',
      description: 'description1',
      price: 100
    })
  })

  //   it('createProduct with category_id', async () => {
  //     expect.assertions(2);

  //     poductRepo.createProduct.mockResolvedValue({
  //       id: 1,
  //       title: 'title1',
  //       image: 'image1',
  //       description: 'description1',
  //       price: 100,
  //     });

  //     const result = await service.save({
  //       title: 'title1',
  //       image: 'image1',
  //       description: 'description1',
  //       price: 100,
  //       //   category_id: 1,
  //     });

  //     expect(poductRepo.createProduct).toHaveBeenCalled();

  //     expect(result).toEqual({
  //       id: 1,
  //       title: 'title1',
  //       image: 'image1',
  //       description: 'description1',
  //       price: 100,
  //     });
  //   });
})
