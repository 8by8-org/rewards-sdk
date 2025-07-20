import { faker } from '@faker-js/faker';
import { RedemptionForum, type IContextualizedReward } from '../../model';
import { fakeCategories } from './fake-categories';

export function createRandomReward(opts: Partial<IContextualizedReward> = {}) {
  const reward: IContextualizedReward = {
    id: faker.string.uuid(),
    shortDescription: faker.lorem.sentence(),
    longDescription: faker.lorem.paragraph(),
    partnerId: faker.lorem.slug(),
    partnerName: faker.company.name(),
    partnerDescription: faker.lorem.paragraph(),
    partnerWebsite: faker.internet.url(),
    partnerWhy8by8: faker.lorem.paragraph(),
    distanceToNearestLocation: faker.number.float({
      min: 100,
      max: 10000,
    }),
    nearestLocationCoordinates: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
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
