import { describe, it, expect } from 'vitest';
import { createRandomReward } from '../../../testing';
import { IRewardSchema } from '../../../schema';

describe('createRandomReward', () => {
  it('creates a random reward.', () => {
    const maybeReward = createRandomReward();
    const isReward = IRewardSchema.safeParse(maybeReward).success;
    expect(isReward).toBe(true);
  });

  it('overrides random options with set options.', () => {
    const opts = createRandomReward();
    const reward = createRandomReward(opts);
    expect(reward).toEqual(opts);
  });
});
