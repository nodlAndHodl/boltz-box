import { Test, TestingModule } from '@nestjs/testing';
import { ClnNodeServiceService } from './cln-node-service.service';

describe('ClnNodeServiceService', () => {
  let service: ClnNodeServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClnNodeServiceService],
    }).compile();

    service = module.get<ClnNodeServiceService>(ClnNodeServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
