import { faker } from '@faker-js/faker';
import { RedemptionForumFilter, SortOrder } from '../constants';
import { fakeCategories } from './fake-categories';
import type { GetContextualizedRewardsOpts } from '../schema';

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
      fakeCategories,
      faker.number.int({ min: 0, max: fakeCategories.length }),
    ),
    maxDistance: faker.number.int({ min: 1000, max: 20000 }),
    ignoreMaxDistanceForOnlineRewards: faker.datatype.boolean(),
    maxNumResults: faker.number.int({ min: 1, max: 100 }),
    ...opts,
  };

  return randomOpts;
}
