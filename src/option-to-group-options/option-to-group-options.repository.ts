import { EntityRepository, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { OptionToGroupOptions } from './option-to-group-options.entity';
import { CreateOptionsGroupOptionsDto } from './dto/create-options-group-options.dto';
import { UpdateOptionsGroupOptionsDto } from './dto/update-options-group-options.dto';

@EntityRepository(OptionToGroupOptions)
export class OptionsGroupOptionsRepository extends Repository<OptionToGroupOptions> {
  async getRecords(): Promise<OptionToGroupOptions[]> {
    const query = this.createQueryBuilder('OptionsGroupOptions');

    const result = await query.getMany();
    return result;
  }

  async createRecord(createProducCategorytDto: CreateOptionsGroupOptionsDto): Promise<OptionToGroupOptions> {
    const { option_id, groupOption_id, option, groupOptions } = createProducCategorytDto;

    const result = new OptionToGroupOptions();
    result.option_id = option_id;
    result.groupOption_id = groupOption_id;
    result.option = option;
    result.groupOptions = groupOptions;

    await result.save();

    return result;
  }

  async deleteRecord(option_id: number): Promise<void> {
    const result = await this.delete({ option_id });

    if (result.affected === 0) {
      throw new NotFoundException(`Records with OPTION ID "${option_id}" not found`);
    }
  }

  async getRecordByOptionId(option_id: number): Promise<OptionToGroupOptions> {
    try {
      const found = await this.findOne({ where: { option_id } });

      if (!found) {
        throw new NotFoundException(`Records with OPTION ID "${option_id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async getRecordByGroupOptionId(groupOption_id: number): Promise<OptionToGroupOptions> {
    try {
      const found = await this.findOne({ where: { groupOption_id } });

      if (!found) {
        throw new NotFoundException(`Records with GROUP_OPTION ID "${groupOption_id}" not found`);
      }

      return found;
    } catch (e) {}
  }

  async updateRecordByOptionId(
    option_id: number,
    updatePostDto: UpdateOptionsGroupOptionsDto,
  ): Promise<OptionToGroupOptions> {
    const { groupOption_id, option, groupOptions } = updatePostDto;

    const found = await this.findOne({ where: { option_id } });
    if (groupOption_id) found.groupOption_id = groupOption_id;
    if (option) found.option = option;
    if (groupOptions) found.groupOptions = groupOptions;

    await found.save();

    return found;
  }
}
