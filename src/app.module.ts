import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './product/product.module';
import { OptionModule } from './option/option.module';
import { CategoryModule } from './category/category.module';
import { GroupOptionsModule } from './group-options/group-options.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ProductModule, OptionModule, CategoryModule, GroupOptionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
