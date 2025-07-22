import { faker } from '@faker-js/faker';
import { RedemptionForumFilter, SortOrder } from '../constants';
import { FAKE_CATEGORIES } from './fake-categories';
import type { GetContextualizedRewardsOpts } from '../schema';

/**
 * Creates a random {@link GetContextualizedRewardsOpts} object. Useful for
 * development and testing.
 *
 * @param opts - A partial {@link GetContextualizedRewardsOpts} object. Allows
 * the developer to override specific random values with hard-coded ones. If
 * omitted, all values will be random.
 *
 * @returns A {@link GetContextualizedRewardsOpts} object.
 */
export function createRandomOptsObject(
  opts?: Partial<GetContextualizedRewardsOpts>,
): GetContextualizedRewardsOpts {
  const randomOpts: GetContextualizedRewardsOpts = {
    redemptionForumFilter: faker.helpers.arrayElement(
      Object.values(RedemptionForumFilter),
    ),
    sortOrder: faker.helpers.arrayElement(Object.values(SortOrder)),
    userCoordinates: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    cursor: {
      partnerName: faker.company.name(),
      rewardId: faker.string.uuid(),
    },
    categories: faker.helpers.uniqueArray(
      FAKE_CATEGORIES,
      faker.number.int({ min: 0, max: FAKE_CATEGORIES.length }),
    ),
    maxDistance: faker.number.int({ min: 1000, max: 20000 }),
    ignoreMaxDistanceForOnlineRewards: faker.datatype.boolean(),
    maxNumResults: faker.number.int({ min: 1, max: 100 }),
    ...opts,
  };

  return randomOpts;
}
