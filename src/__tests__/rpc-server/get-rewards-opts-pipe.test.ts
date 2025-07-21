import { describe, it, expect } from 'vitest';
import { createRandomQueryParamsObject } from '../../testing';
import { GetContextualizedRewardsOptsPipe } from '../../rpc-server';
import { GetContextualizedRewardsOptsSchema } from '../../schema';

describe('GetRewardOptsPipe', () => {
  it('transforms a query params object into a GetRewardOpts object.', () => {
    const queryParams = createRandomQueryParamsObject();
    const pipe = new GetContextualizedRewardsOptsPipe();
    const transformed = pipe.transform(queryParams);
    expect(
      GetContextualizedRewardsOptsSchema.safeParse(transformed).success,
    ).toBe(true);
  });
});
