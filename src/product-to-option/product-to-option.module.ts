import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductToOptionRepository } from './product-to-option.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProductToOptionRepository])]
})
export class ProductOptionModule {}
