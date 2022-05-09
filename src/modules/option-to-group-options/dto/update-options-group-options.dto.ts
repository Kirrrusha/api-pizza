import { IsOptional } from 'class-validator';
import { GroupOptions } from '../../group-options/group-options.entity';
import { Option } from '../../option/option.entity';

export class UpdateOptionsGroupOptionsDto {
  @IsOptional()
  groupOption_id: number;

  @IsOptional()
  option: Option;

  @IsOptional()
  groupOptions: GroupOptions;
}
