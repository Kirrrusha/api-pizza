import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupOptionsController } from './group-options.controller';

@Module({
//   imports: [TypeOrmModule.forFeature([OptionRepository])],
  controllers: [GroupOptionsController]
})
export class GroupOptionsModule {}
