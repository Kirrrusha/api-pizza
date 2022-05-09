import { Module } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionController } from './option.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionRepository } from './option.repository';

@Module({
  imports: [TypeOrmModule.forFeature([OptionRepository])],
  providers: [OptionService],
  controllers: [OptionController]
})
export class OptionModule {}
