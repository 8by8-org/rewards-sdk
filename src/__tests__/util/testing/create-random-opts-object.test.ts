import { describe, it, expect } from 'vitest';
import { createRandomOptsObject } from '../../../util/testing';
import { GetContextualizedRewardsOptsSchema } from '../../../schema';

describe('createRandomOptsObject', () => {
  it('creates a random opts object.', () => {
    const maybeOptsObject = createRandomOptsObject();
    const isOptsObject =
      GetContextualizedRewardsOptsSchema.safeParse(maybeOptsObject).success;
    expect(isOptsObject).toBe(true);
  });

  it('overrides random options with set options.', () => {
    const opts = createRandomOptsObject();
    const optsObject = createRandomOptsObject(opts);
    expect(optsObject).toEqual(opts);
  });
});
