import { OptionToGroupOptions } from 'src/option-to-group-options/option-to-group-options.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm';

@Entity('GroupOptions')
export class GroupOptions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => OptionToGroupOptions, optionsToGroupOptions => optionsToGroupOptions.groupOptions)
  public optionToGroupOptions!: OptionToGroupOptions[];
}
