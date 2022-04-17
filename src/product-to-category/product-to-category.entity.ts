import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';
import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';

  @Entity('ProductToCategory')
  export class ProductToCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    public productToCategoryId!: number

    @PrimaryColumn({ type: "int" })
    public category_id!: number;

    @PrimaryColumn({ type: "int" })
    public product_id!: number;

    @ManyToOne(() => Category, (category) => category.productToCategory)
    public category: Category

    @ManyToOne(() => Product, (product) => product.productToCategory)
    public product: Product
  }