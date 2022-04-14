import { Category } from 'src/category/category.entity';
import { Product } from 'src/product/product.entity';
import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
  } from 'typeorm';

  @Entity()
  export class ProductCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

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