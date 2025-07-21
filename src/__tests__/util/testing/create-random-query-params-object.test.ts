import { describe, it, expect } from 'vitest';
import { createRandomQueryParamsObject } from '../../../util/testing';
import { GetContextualizedRewardsQueryParamsSchema } from '../../../schema';

describe('createRandomQueryParamsObject', () => {
  it('creates a random query params object.', () => {
    const maybeQueryParamsObj = createRandomQueryParamsObject();
    const isQueryParamsObj =
      GetContextualizedRewardsQueryParamsSchema.safeParse(
        maybeQueryParamsObj,
      ).success;
    expect(isQueryParamsObj).toBe(true);
  });

  it('overrides random options with set options.', () => {
    const opts = createRandomQueryParamsObject();
    const queryParamsObj = createRandomQueryParamsObject(opts);
    expect(queryParamsObj).toEqual(opts);
  });
});
