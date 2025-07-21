import { describe, it, expect } from 'vitest';
import { QueryParamsConverter } from '../../rpc-shared';
import { GetContextualizedRewardsQueryParamsSchema } from '../../schema';
import { GetContextualizedRewardsOptsSchema } from '../../schema';
import {
  createRandomOptsObject,
  createRandomQueryParamsObject,
} from '../../util/testing';

describe('QueryParamsConverter', () => {
  it('converts a GetContextualizedRewardsOpts object into a query params object.', () => {
    const opts = createRandomOptsObject();
    const converted = QueryParamsConverter.toQueryParams(opts);
    expect(
      GetContextualizedRewardsQueryParamsSchema.safeParse(converted).success,
    ).toBe(true);

    for (const [key, value] of Object.entries(converted)) {
      if (
        [
          'userLatitude',
          'userLongitude',
          'partnerNameCursor',
          'rewardIdCursor',
        ].includes(key)
      ) {
        continue;
      }

      // toEqual is used here to be able to check categories
      expect(opts[key]).toEqual(value);
    }

    expect(converted.userLatitude).toBe(opts.userCoordinates?.latitude);
    expect(converted.userLongitude).toBe(opts.userCoordinates?.longitude);
    expect(converted.partnerNameCursor).toBe(opts.cursor?.partnerName);
    expect(converted.rewardIdCursor).toBe(opts.cursor?.rewardId);
  });

  it('converts a query params object into a GetContextualizedRewardsOpts object.', () => {
    const queryParams = createRandomQueryParamsObject();
    const converted =
      QueryParamsConverter.toGetContextualizedRewardsOpts(queryParams);
    expect(
      GetContextualizedRewardsOptsSchema.safeParse(converted).success,
    ).toBe(true);

    for (const [key, value] of Object.entries(converted)) {
      if (['userCoordinates', 'cursor'].includes(key)) {
        continue;
      }

      // toEqual is used here to be able to check categories
      expect(queryParams[key]).toEqual(value);
    }

    expect(converted.userCoordinates?.latitude).toBe(queryParams.userLatitude);
    expect(converted.userCoordinates?.longitude).toBe(
      queryParams.userLongitude,
    );
    expect(converted.cursor?.partnerName).toBe(queryParams.partnerNameCursor);
    expect(converted.cursor?.rewardId).toBe(queryParams.rewardIdCursor);
  });
});
