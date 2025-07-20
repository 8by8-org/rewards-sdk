import { faker } from '@faker-js/faker';
import { z } from 'zod';
import { getContextualizedRewardsParamsSchema } from '../../schema';
import { RedemptionForumFilter, SortOrder } from '../../model';
import { fakeCategories } from './fake-categories';

export function createRandomQueryParamsObject(
  opts?: Partial<z.infer<typeof getContextualizedRewardsParamsSchema>>,
): z.infer<typeof getContextualizedRewardsParamsSchema> {
  const queryParams: z.infer<typeof getContextualizedRewardsParamsSchema> = {
    redemptionForumFilter: faker.helpers.arrayElement(
      Object.values(RedemptionForumFilter),
    ),
    sortOrder: faker.helpers.arrayElement(Object.values(SortOrder)),
    userLatitude: faker.location.latitude(),
    userLongitude: faker.location.longitude(),
    partnerNameCursor: faker.company.name(),
    rewardIdCursor: faker.string.uuid(),
    categories: faker.helpers.uniqueArray(
      fakeCategories,
      faker.number.int({ min: 0, max: fakeCategories.length }),
    ),
    maxDistance: faker.number.int({ min: 1000, max: 20000 }),
    ignoreMaxDistanceForOnlineRewards: faker.datatype.boolean(),
    maxNumResults: faker.number.int({ min: 1, max: 100 }),
    ...opts,
  };

  return queryParams;
}
