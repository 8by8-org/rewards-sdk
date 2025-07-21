import { faker } from '@faker-js/faker';
import { createRandomRewardWithPartnerData } from './create-random-reward-with-partner-data';
import { createRandomPoint } from './create-random-point';
import type { IContextualizedReward } from '../../schema';

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
