import { faker } from '@faker-js/faker';
import { RedemptionForum } from '../../constants';
import { fakeCategories } from './fake-categories';
import type { IReward } from '../../schema';

export function createRandomReward(opts: Partial<IReward> = {}) {
  const reward: IReward = {
    id: faker.string.uuid(),
    shortDescription: faker.lorem.sentence(),
    longDescription: faker.lorem.paragraph(),
    partnerId: faker.lorem.slug(),
    redemptionForums: faker.helpers.uniqueArray(
      Object.values(RedemptionForum),
      faker.number.int({
        min: 1,
        max: 2,
      }),
    ),
    categories: faker.helpers.uniqueArray(
      fakeCategories,
      faker.number.int({
        min: 0,
        max: fakeCategories.length,
      }),
    ),
    expirationDate: faker.date.anytime(),
    ...opts,
  };

  return reward;
}
