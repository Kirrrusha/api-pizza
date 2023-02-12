import { lineDelimiter } from './../../../helpers'
import { Model, Types } from 'mongoose'
import { Injectable, Logger } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Option } from '../schemas/option.schema'
import { SaveOptionDto } from '../dto/save-option.dto'

@Injectable()
export class OptionRepository {
  constructor(
    @InjectModel(Option.name)
    private readonly optionDBProvider: Model<Option>,
  ) {}

  private readonly logger = new Logger(Option.name)

  async getAll(): Promise<Option[]> {
    try {
      this.logger.log('GET_ALL PENDING')

      const result = this.optionDBProvider.find().lean().exec()

      this.logger.log('GET_ALL SUCCESS')
      lineDelimiter()

      return result
    } catch (error) {
      this.logger.error(`GET_ALL ERROR: ${error.message}`)
      lineDelimiter()
    }
  }

  async save(saveOptionDto: SaveOptionDto): Promise<Option> {
    const { title, image } = saveOptionDto
    const prefix = `[Option name: ${title}]`

    Logger.log(`${prefix} SAVING`)
    try {
      const result = this.optionDBProvider
        .findOneAndUpdate(
          {
            $or: [{ title }],
          },
          {
            title,
            image,
          },
          {
            upsert: true,
          },
        )
        .lean()
        .exec()

      Logger.log(`${prefix} SUCCESS`)
      lineDelimiter()

      return result
    } catch (error) {
      Logger.error(`${prefix} SAVE ERROR: ${error.message}`)
      lineDelimiter()
    }
  }

  async remove(id: Types.ObjectId): Promise<void> {
    const prefix = `[MONGO ID: ${id}]`

    try {
      this.logger.log(`${prefix} REMOVE START`)
      await this.optionDBProvider.findByIdAndDelete(id).lean().exec()
      this.logger.log(`${prefix} REMOVE SUCCESS`)
      lineDelimiter()
    } catch (error) {
      this.logger.error(`${prefix} REMOVE ERROR: ${error.message}`)
      lineDelimiter()
    }
  }

  async getOneByTitle(title: string): Promise<Option> {
    const prefix = `[TITLE RECORD: ${title}]`

    try {
      this.logger.log(`${prefix} GET_ONE_BY_TITLE START`)

      const found = await this.optionDBProvider.findOne({ title }).exec()

      this.logger.log(`${prefix} GET_ONE_BY_TITLE SUCCESS`)
      lineDelimiter()
      return found
    } catch (e) {
      this.logger.error(`${prefix} GET_ONE_BY_TITLE ERROR: ${e.message}`)
      lineDelimiter()
    }
  }
}
