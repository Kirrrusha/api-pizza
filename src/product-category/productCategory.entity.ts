import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';
import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    JoinColumn,
    OneToOne
  } from 'typeorm';

  @Entity()
  export class ProductCategory extends BaseEntity {
    @PrimaryColumn({ type: "int" })
    category_id: number;

    @PrimaryColumn({ type: "int" })
    product_id: number;

    @OneToOne(() => Category)
    @JoinColumn({name: 'id'})
    category: Category

    @OneToOne(() => Product)
    @JoinColumn({name: 'id'})
    product: Product
  }