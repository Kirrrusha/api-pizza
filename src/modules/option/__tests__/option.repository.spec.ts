import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { MongooseModule } from '@nestjs/mongoose'

import { OptionRepository } from '../repo/option.repository'
import { Option, OptionSchema } from '../schemas/option.schema'

describe('Test category repository', () => {
  let app: INestApplication
  let repo: OptionRepository

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/Pizza?authSource=admin', {
          useNewUrlParser: true,
          user: 'root',
          pass: 'root',
          autoIndex: true,
          autoCreate: true,
        }),
        MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }]),
      ],
      providers: [OptionRepository],
    }).compile()

    app = module.createNestApplication()
    repo = module.get<OptionRepository>(OptionRepository)

    await app.init()
  })

  afterAll(async () => {
    await app.close()
  })

  afterEach(async () => {
    const refreshDatabase = () => repo['optionDBProvider'].deleteMany({}).exec()
    await refreshDatabase()
  })

  it('should be defined', () => {
    expect.assertions(2)

    expect(app).toBeDefined()
    expect(repo).toBeDefined()
  })

  it('should return record when search By id or null if not exists', async () => {
    expect.assertions(2)
    await repo.save({
      title: 'title',
    })
    const result = await repo.getOneByTitle('123')
    expect(result).toBeFalsy()

    const secondResult = await repo.getOneByTitle('title')

    expect(secondResult).toEqual(
      expect.objectContaining({
        title: 'title',
      }),
    )
  })

  it('should return all record', async () => {
    expect.assertions(4)
    const mock = [
      {
        title: 'title1',
      },
      {
        title: 'title2',
      },
      {
        title: 'title3',
      },
    ]
    await repo.save(mock[0])
    await repo.save(mock[1])
    await repo.save(mock[2])
    const result = await repo.getAll()
    expect(result.length).toEqual(3)
    result.forEach((res, index) => {
      expect(res).toEqual(expect.objectContaining(mock[index]))
    })
  })

  it('should remove record', async () => {
    expect.assertions(2)

    await repo.save({ title: 'title' })
    let result = await repo.getAll()
    expect(result.length).toEqual(1)

    await repo.remove(result[0]['_id'])
    const getAll = await repo.getAll()
    expect(getAll.length).toEqual(0)
  })
})
