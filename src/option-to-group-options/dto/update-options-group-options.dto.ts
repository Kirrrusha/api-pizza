import { IsOptional } from 'class-validator';
import { GroupOptions } from 'src/group-options/group-options.entity';
import { Option } from 'src/option/option.entity';

export class UpdateOptionsGroupOptionsDto {
  @IsOptional()
  groupOption_id: number;

  @IsOptional()
  option: Option;

  @IsOptional()
  groupOptions: GroupOptions;
}
