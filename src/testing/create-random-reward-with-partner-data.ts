import { faker } from '@faker-js/faker';
import { createRandomReward } from './create-random-reward';
import type { IRewardWithPartnerData } from '../schema';

export function createRandomRewardWithPartnerData(
  opts: Partial<IRewardWithPartnerData> = {},
) {
  const reward: IRewardWithPartnerData = {
    ...createRandomReward(),
    partnerLogoUrl: faker.image.url({ width: 400, height: 400 }),
    partnerName: faker.company.name(),
    partnerDescription: faker.lorem.paragraph(),
    partnerWebsite: faker.internet.url(),
    partnerWhy8by8: faker.lorem.paragraph(),
    ...opts,
  };

  return reward;
}
