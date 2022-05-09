import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OptionsGroupOptionsRepository } from './option-to-group-options.repository';

@Module({
    imports: [TypeOrmModule.forFeature([OptionsGroupOptionsRepository])]
})
export class OptionsGroupOptionsModule {}
