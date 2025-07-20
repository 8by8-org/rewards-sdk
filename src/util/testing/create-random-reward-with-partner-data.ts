import { faker } from '@faker-js/faker';
import { RedemptionForum, type IRewardWithPartnerData } from '../../model';
import { fakeCategories } from './fake-categories';

export function createRandomRewardWithPartnerData(
  opts: Partial<IRewardWithPartnerData> = {},
) {
  const reward: IRewardWithPartnerData = {
    id: faker.string.uuid(),
    shortDescription: faker.lorem.sentence(),
    longDescription: faker.lorem.paragraph(),
    partnerId: faker.lorem.slug(),
    partnerName: faker.company.name(),
    partnerDescription: faker.lorem.paragraph(),
    partnerWebsite: faker.internet.url(),
    partnerWhy8by8: faker.lorem.paragraph(),
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
