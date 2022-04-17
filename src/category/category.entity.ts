import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';
import { ProductToCategory } from 'src/product-to-category/product-to-category.entity';
@Entity('Category')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => ProductToCategory, productToCategory => productToCategory.category)
  public productToCategory!: ProductToCategory[];
}
