import { OptionToGroupOptions } from 'src/option-to-group-options/option-to-group-options.entity';
import { ProductToOption } from 'src/product-to-option/product-to-option.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

@Entity('Option')
export class Option extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @OneToMany(() => OptionToGroupOptions, optionsToGroupOptions => optionsToGroupOptions.option)
  public optionToGroupOptions!: OptionToGroupOptions[];

  @OneToMany(() => ProductToOption, productToOption => productToOption.option)
  public productToOption!: ProductToOption[];
}
