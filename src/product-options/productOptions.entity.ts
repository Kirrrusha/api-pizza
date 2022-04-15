import { Option } from 'src/option/option.entity';
import { Product } from 'src/product/product.entity';
import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    JoinColumn,
    OneToOne
  } from 'typeorm';

  @Entity()
  export class ProductOptions extends BaseEntity {
    @PrimaryColumn({ type: "int" })
    option_id: number;

    @PrimaryColumn({ type: "int" })
    product_id: number;

    @OneToOne(() => Option)
    @JoinColumn({name: 'id'})
    option: Option

    @OneToOne(() => Product)
    @JoinColumn({name: 'id'})
    product: Product
  }