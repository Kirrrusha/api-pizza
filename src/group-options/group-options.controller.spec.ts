import { Test, TestingModule } from '@nestjs/testing';
import { GroupOptionsController } from './group-options.controller';

describe('GroupOptionsController', () => {
  let controller: GroupOptionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupOptionsController],
    }).compile();

    controller = module.get<GroupOptionsController>(GroupOptionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
