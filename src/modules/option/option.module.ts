import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { OptionService } from './services/option.service'
import { Option, OptionSchema } from './schemas/option.schema'
import { OptionController } from './controllers/option.controller'
import { OptionRepository } from './repo/option.repository'

@Module({
  imports: [MongooseModule.forFeature([{ name: Option.name, schema: OptionSchema }])],
  providers: [OptionService, OptionRepository],
  controllers: [OptionController],
})
export class OptionModule {}
