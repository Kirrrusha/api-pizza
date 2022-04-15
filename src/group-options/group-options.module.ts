import { Module } from '@nestjs/common';
import { GroupOptionsController } from './group-options.controller';

@Module({
  controllers: [GroupOptionsController]
})
export class GroupOptionsModule {}
