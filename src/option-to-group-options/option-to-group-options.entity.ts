import { GroupOptions } from 'src/group-options/group-options.entity';
import { Option } from 'src/option/option.entity';
import {
    BaseEntity,
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn
  } from 'typeorm';

  @Entity('OptionToGroupOptions')
  export class OptionToGroupOptions extends BaseEntity {
    @PrimaryGeneratedColumn()
    public optionsToGroupOptionsyId!: number

    @Column({ type: "int" })
    public option_id!: number;

    @Column({ type: "int" })
    public groupOption_id!: number;

    @ManyToOne(() => Option, (option) => option.optionToGroupOptions)
    public option!: Option

    @ManyToOne(() => GroupOptions, (groupOptions) => groupOptions.optionToGroupOptions)
    public groupOptions!: GroupOptions
  }