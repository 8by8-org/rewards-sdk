import { describe, it, expect } from 'vitest';
import { createRandomContextualizedReward } from '../../../testing';
import { IContextualizedRewardSchema } from '../../../schema';

describe('createRandomContextualizedReward', () => {
  it('creates a random contextualized reward.', () => {
    const maybeContextualizedReward = createRandomContextualizedReward();
    const isContextualizedReward = IContextualizedRewardSchema.safeParse(
      maybeContextualizedReward,
    ).success;
    expect(isContextualizedReward).toBe(true);
  });

  it('overrides random options with set options.', () => {
    const opts = createRandomContextualizedReward();
    const contextualizedReward = createRandomContextualizedReward(opts);
    expect(contextualizedReward).toEqual(opts);
  });
});
