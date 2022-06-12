import { Model, Types } from 'mongoose'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { SaveCategoryDto } from '../dto/save-category.dto'
import { Category } from './../schemas/category.schema'
import { lineDelimiter } from './../../../helpers/index'

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryDBProvider: Model<Category>
  ) {}

  private readonly logger = new Logger(Category.name)

  async getAll(): Promise<Category[]> {
    try {
      this.logger.log('GET_ALL PENDEING')

      const result = this.categoryDBProvider.find().populate('products').lean().exec()

      this.logger.log('GET_ALL SUCCESS')
      lineDelimiter()

      return result
    } catch (err) {
      this.logger.error(`GET_ALL ERROR: ${err.message}`)
      lineDelimiter()
    }
  }

  async save(saveCategoryDto: SaveCategoryDto): Promise<Category> {
    const { title } = saveCategoryDto
    const prefix = `[Category name: ${title}]`

    Logger.log(`${prefix} SAVING`)

    try {
      const result = await this.categoryDBProvider
        .findOneAndUpdate(
          {
            $or: [{ title }]
          },
          {
            title
          },
          {
            upsert: true
          }
        )
        .lean()
        .exec()

      Logger.log(`${prefix} SUCCESS`)
      lineDelimiter()

      return result
    } catch (e) {
      Logger.error(`${prefix} SAVE ERROR: ${e.message}`)
      lineDelimiter()
    }
  }

  async remove(id: Types.ObjectId): Promise<void> {
    const prefix = `[MONGO ID: ${id}]`

    try {
      this.logger.log(`${prefix} REMOVE START`)
      await this.categoryDBProvider.findByIdAndDelete(id)
      this.logger.log(`${prefix} REMOVE SUCCESS`)
      lineDelimiter()
    } catch (error) {
      this.logger.error(`${prefix} REMOVE ERROR: ${error.message}`)
      lineDelimiter()
    }
  }

  async getOneByTitle(title: string): Promise<Category> {
    const prefix = `[TITLE RECORD: ${title}]`

    try {
      this.logger.log(`${prefix} GET_ONE_BY_TITLE START`)

      const found = await this.categoryDBProvider.findOne({ title }).populate('categories').exec()

      this.logger.log(`${prefix} GET_ONE_BY_TITLE SUCCESS`)
      lineDelimiter()
      return found
    } catch (e) {
      this.logger.error(`${prefix} GET_ONE_BY_TITLE ERROR: ${e.message}`)
      lineDelimiter()
    }
  }
}
