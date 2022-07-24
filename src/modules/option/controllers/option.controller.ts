import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { OptionService } from '../services/option.service'
import { Option } from '../schemas/option.schema'
import { SaveOptionDto } from '../dto/save-option.dto'
import { Types } from 'mongoose'

@ApiTags('options')
@Controller('options')
export class OptionController {
  constructor(private optionService: OptionService) {}

  @Get()
  getAll(): Promise<Option[]> {
    return this.optionService.getAll()
  }

  @Post()
  @UsePipes(ValidationPipe)
  save(@Body() saveProductDTO: SaveOptionDto): Promise<Option> {
    return this.optionService.save(saveProductDTO)
  }

  // TODO add pipe mongo id
  @Delete('/:id')
  remove(@Param('id') id: Types.ObjectId): Promise<Types.ObjectId> {
    return this.optionService.remove(id)
  }

  @Get('/:id')
  getOne(@Param('id', ParseIntPipe) id: string): Promise<Option> {
    return this.optionService.getOne(id)
  }
}
