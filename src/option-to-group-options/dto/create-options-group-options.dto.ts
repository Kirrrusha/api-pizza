import { IsNotEmpty } from 'class-validator';
import { GroupOptions } from 'src/group-options/group-options.entity';
import { Option } from 'src/option/option.entity';

export class CreateOptionsGroupOptionsDto {
  @IsNotEmpty()
  option_id: number;

  @IsNotEmpty()
  groupOption_id: number;

  @IsNotEmpty()
  option: Option;

  @IsNotEmpty()
  groupOptions: GroupOptions;
}
