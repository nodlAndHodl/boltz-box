import { Test, TestingModule } from '@nestjs/testing';
import { LnApiController } from './app.controller';
import { LnService } from './app.service';

describe('AppController', () => {
  let appController: LnApiController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [LnApiController],
      providers: [LnService],
    }).compile();

    appController = app.get<LnApiController>(LnApiController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
