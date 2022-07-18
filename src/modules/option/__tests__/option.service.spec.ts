import { Test, TestingModule } from '@nestjs/testing'
import { OptionService } from '../services/option.service'

import { optionRepositoryMock } from '../mocks/optionRepositoryMock'
import { OptionRepository } from '../repo/option.repository'
import { Types } from 'mongoose'

describe('OptionService', () => {
  let service
  let repo

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionService, { provide: OptionRepository, useFactory: optionRepositoryMock }],
    }).compile()

    service = module.get<OptionService>(OptionService)
    repo = module.get<OptionRepository>(OptionRepository)
  })

  it('should be defined', () => {
    expect.assertions(2)

    expect(service).toBeDefined()
    expect(repo).toBeDefined()
  })

  it('getAll method should be work', async () => {
    expect.assertions(2)

    repo.getAll.mockResolvedValue([
      {
        title: 'title1',
      },
      {
        title: 'title2',
      },
    ])

    const result = await service.getAll()

    expect(repo.getAll).toHaveBeenCalled()
    expect(result.length).toEqual(2)
  })

  it('save method should be work', async () => {
    expect.assertions(2)

    repo.save.mockResolvedValue({
      title: 'title1',
    })

    const result = await service.save()

    expect(repo.save).toHaveBeenCalled()
    expect(result).toEqual({
      title: 'title1',
    })
  })

  it('remove method should be work', async () => {
    expect.assertions(2)
    const id = new Types.ObjectId()

    repo.remove.mockResolvedValue(id)

    const result = await service.remove(id)

    expect(repo.remove).toHaveBeenCalled()
    expect(result).toEqual(id)
  })

  it('getOne method should be work', async () => {
    // expect.assertions(2)

    repo.getOneByTitle.mockResolvedValue({
      title: 'title1',
    })

    const result = await service.getOne('123')

    expect(repo.getOneByTitle).toHaveBeenCalledWith('123')
    expect(result).toEqual({
      title: 'title1',
    })
  })
})
