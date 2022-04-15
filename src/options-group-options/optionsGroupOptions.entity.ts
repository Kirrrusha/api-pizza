import { GroupOptions } from 'src/group-options/groupOptions.entity';
import { Option } from 'src/option/option.entity';
import {
    BaseEntity,
    Entity,
    PrimaryColumn,
    JoinColumn,
    OneToOne
  } from 'typeorm';

  @Entity()
  export class OptionsGroupOptions extends BaseEntity {
    @PrimaryColumn({ type: "int" })
    option_id: number;

    @PrimaryColumn({ type: "int" })
    groupOption_id: number;

    @OneToOne(() => Option)
    @JoinColumn({name: 'id'})
    option: Option

    @OneToOne(() => GroupOptions)
    @JoinColumn({name: 'id'})
    groupOption: GroupOptions
  }