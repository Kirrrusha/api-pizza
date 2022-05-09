import { ProductToCategory } from '../product-to-category/product-to-category.entity';
import { ProductToOption } from '../product-to-option/product-to-option.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'Product' })
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public title!: string;

  @Column()
  public image: string;

  @Column()
  public description!: string;

  @Column()
  public price!: number;

  @OneToMany(
    () => ProductToCategory,
    (productToCategory) => productToCategory.product,
    // { nullable: true, cascade: true },
  )
  public productToCategory: ProductToCategory[];

  @OneToMany(
    () => ProductToOption,
    (productToOption) => productToOption.product,
    { nullable: true, cascade: true },
  )
  public productToOption: ProductToOption[];
}
