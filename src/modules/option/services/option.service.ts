import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'
import { SaveOptionDto } from '../dto/save-option.dto'
import { OptionRepository } from '../repo/option.repository'
import { Option } from '../schemas/option.schema'

@Injectable()
export class OptionService {
  constructor(private optionRepo: OptionRepository) {}

  async getAll(): Promise<Option[]> {
    return this.optionRepo.getAll()
  }

  async save(payload: SaveOptionDto): Promise<Option> {
    return this.optionRepo.save(payload)
  }

  async remove(id: Types.ObjectId): Promise<Types.ObjectId> {
    await this.optionRepo.remove(id)

    return id
  }

  async getOne(title: string): Promise<Option> {
    return this.optionRepo.getOneByTitle(title)
  }
}
