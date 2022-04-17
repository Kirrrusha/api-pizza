import { ProductToCategory } from 'src/product-to-category/product-to-category.entity';
import { ProductToOption } from 'src/product-to-option/product-to-option.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

@Entity('Product')
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

  @OneToMany(() => ProductToCategory, productToCategory => productToCategory.product)
  public productToCategory: ProductToCategory[];

  @OneToMany(() => ProductToOption, productToOption => productToOption.product)
  public productToOption: ProductToOption[];
}
