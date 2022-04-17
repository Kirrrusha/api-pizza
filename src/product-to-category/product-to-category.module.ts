import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductToCategoryRepository } from './product-to-category.repository';
@Module({
    imports: [TypeOrmModule.forFeature([ProductToCategoryRepository])],
})
export class ProductToCategoryModule {}
