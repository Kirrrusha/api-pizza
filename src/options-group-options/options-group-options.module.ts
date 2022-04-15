import { Module } from '@nestjs/common';
import { OptionsGroupOptionsService } from './options-group-options.service';

@Module({
  providers: [OptionsGroupOptionsService]
})
export class OptionsGroupOptionsModule {}
