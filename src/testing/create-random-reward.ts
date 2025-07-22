import { faker } from '@faker-js/faker';
import { RedemptionForum } from '../constants';
import { FAKE_CATEGORIES } from './fake-categories';
import type { IReward } from '../schema';

/**
 * Creates a random {@link IReward} object. Useful development and testing.
 *
 * @param opts - A partial {@link IReward} object. Allows the developer to
 * override specific random values with hard-coded ones. If omitted, all values
 * will be random.
 *
 * @returns An {@link IReward} object.
 */
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
      FAKE_CATEGORIES,
      faker.number.int({
        min: 0,
        max: FAKE_CATEGORIES.length,
      }),
    ),
    expirationDate: faker.date.anytime(),
    ...opts,
  };

  return reward;
}
