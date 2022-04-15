import { Module } from '@nestjs/common';
import { ProductOptionsService } from './product-options.service';
import { ProductOptionsController } from './product-options.controller';

@Module({
  providers: [ProductOptionsService],
  controllers: [ProductOptionsController]
})
export class ProductOptionsModule {}
