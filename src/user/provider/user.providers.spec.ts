import { Test, TestingModule } from '@nestjs/testing';
import { UserProviders } from './user.providers';

describe('UserProviders', () => {
  let provider: UserProviders;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserProviders],
    }).compile();

    provider = module.get<UserProviders>(UserProviders);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
