import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './modules/product/product.module';
import { OptionModule } from './modules/option/option.module';
import { CategoryModule } from './modules/category/category.module';
import { GroupOptionsModule } from './modules/group-options/group-options.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
    }),
    ProductModule,
    OptionModule,
    CategoryModule,
    GroupOptionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
