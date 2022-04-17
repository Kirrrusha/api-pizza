import { Option } from 'src/option/option.entity';
import { Product } from 'src/product/product.entity';

import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    ManyToOne
  } from 'typeorm';

  @Entity('ProductToOption')
  export class ProductToOption extends BaseEntity {
    @PrimaryGeneratedColumn()
    public productToOptionId!: number

    @PrimaryColumn({ type: "int" })
    option_id: number;

    @PrimaryColumn({ type: "int" })
    product_id: number;

    @ManyToOne(() => Option, (product) => product.productToOption)
    public option!: Option

    @ManyToOne(() => Product, (product) => product.productToOption)
    public product!: Product
  }