import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { ProductModule } from './modules/product/product.module'
import { OptionModule } from './modules/option/option.module'
import { CategoryModule } from './modules/category/category.module'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
    }),
    ProductModule,
    OptionModule,
    CategoryModule,
  ],
})
export class AppModule {}
