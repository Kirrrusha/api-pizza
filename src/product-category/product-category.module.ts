import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategoryRepository } from './product-category.repository';
@Module({
    imports: [TypeOrmModule.forFeature([ProductCategoryRepository])],
})
export class ProductCategoryModule {}
