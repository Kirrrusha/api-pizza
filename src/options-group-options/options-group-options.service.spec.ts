import { Test, TestingModule } from '@nestjs/testing';
import { OptionsGroupOptionsService } from './options-group-options.service';

describe('OptionsGroupOptionsService', () => {
  let service: OptionsGroupOptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionsGroupOptionsService],
    }).compile();

    service = module.get<OptionsGroupOptionsService>(OptionsGroupOptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
