import { faker } from '@faker-js/faker';
import { createRandomRewardWithPartnerData } from './create-random-reward-with-partner-data';
import { createRandomPoint } from './create-random-point';
import type { IContextualizedReward } from '../schema';

/**
 * Creates a random {@link IContextualizedReward} object. Useful for development
 * and testing.
 *
 * @param opts - A partial {@link IContextualizedReward} object. Allows the
 * developer to override specific random values with hard-coded ones. If
 * omitted, all values will be random.
 *
 * @returns An {@link IContextualizedReward} object.
 */
export function createRandomContextualizedReward(
  opts: Partial<IContextualizedReward> = {},
) {
  const reward: IContextualizedReward = {
    ...createRandomRewardWithPartnerData(),
    distanceToNearestLocation: faker.number.float({
      min: 100,
      max: 10000,
    }),
    nearestLocationCoordinates: createRandomPoint(),
    ...opts,
  };

  return reward;
}
