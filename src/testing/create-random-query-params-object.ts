import { faker } from '@faker-js/faker';
import { RedemptionForumFilter, SortOrder } from '../constants';
import { FAKE_CATEGORIES } from './fake-categories';
import type { GetContextualizedRewardsQueryParams } from '../schema';

/**
 * Creates a random {@link GetContextualizedRewardsQueryParams} object.
 * Useful for development and testing.
 *
 * @param opts - A partial {@link GetContextualizedRewardsQueryParams} object.
 * Allows the developer to override specific random values with hard-coded ones.
 * If omitted, all values will be random.
 *
 * @returns A {@link GetContextualizedRewardsQueryParams} object.
 */
export function createRandomQueryParamsObject(
  opts?: Partial<GetContextualizedRewardsQueryParams>,
): GetContextualizedRewardsQueryParams {
  const queryParams: GetContextualizedRewardsQueryParams = {
    redemptionForumFilter: faker.helpers.arrayElement(
      Object.values(RedemptionForumFilter),
    ),
    sortOrder: faker.helpers.arrayElement(Object.values(SortOrder)),
    userLatitude: faker.location.latitude(),
    userLongitude: faker.location.longitude(),
    partnerNameCursor: faker.company.name(),
    rewardIdCursor: faker.string.uuid(),
    categories: faker.helpers.uniqueArray(
      FAKE_CATEGORIES,
      faker.number.int({ min: 0, max: FAKE_CATEGORIES.length }),
    ),
    maxDistance: faker.number.int({ min: 1000, max: 20000 }),
    ignoreMaxDistanceForOnlineRewards: faker.datatype.boolean(),
    maxNumResults: faker.number.int({ min: 1, max: 100 }),
    ...opts,
  };

  return queryParams;
}
