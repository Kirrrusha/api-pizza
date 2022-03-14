import { GroupOptions } from 'src/group-options/groupOptions.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Product } from '../product/product.entity';

@Entity()
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @ManyToMany(() => Product, (product) => product.id)
  @JoinTable({
    name: 'product_options',
    joinColumn: {
      name: 'option_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];

  @ManyToMany(() => GroupOptions, (group) => group.id)
  @JoinTable({
    name: 'groupOptions_options',
    joinColumn: {
      name: 'option_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'groupOptions_id',
      referencedColumnName: 'id',
    },
  })
  group: GroupOptions[];
}
