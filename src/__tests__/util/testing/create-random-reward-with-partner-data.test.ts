import { describe, it, expect } from 'vitest';
import { createRandomRewardWithPartnerData } from '../../../util/testing';
import { IRewardWithPartnerDataSchema } from '../../../schema';

describe('createRandomRewardWithPartnerData', () => {
  it('creates a random reward with partner data.', () => {
    const maybeRewardWithPartnerData = createRandomRewardWithPartnerData();
    const isRewardWithPartnerData = IRewardWithPartnerDataSchema.safeParse(
      maybeRewardWithPartnerData,
    ).success;
    expect(isRewardWithPartnerData).toBe(true);
  });

  it('overrides random options with set options.', () => {
    const opts = createRandomRewardWithPartnerData();
    const rewardWithPartnerData = createRandomRewardWithPartnerData(opts);
    expect(rewardWithPartnerData).toEqual(opts);
  });
});
