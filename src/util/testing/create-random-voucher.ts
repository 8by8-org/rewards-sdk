import { faker } from '@faker-js/faker';
import { RedemptionMethod } from '../../constants';
import type { IVoucher } from '../../schema';

export function createRandomVoucher(
  redemptionMethod: RedemptionMethod = faker.helpers.arrayElement(
    Object.values(RedemptionMethod),
  ),
): IVoucher {
  switch (redemptionMethod) {
    case RedemptionMethod.Code:
      return {
        redemptionMethod,
        value: faker.string.nanoid(),
        instructions: faker.lorem.paragraph(),
      };
    case RedemptionMethod.QRCode:
      return {
        redemptionMethod,
        value: faker.internet.url(),
        instructions: faker.lorem.paragraph(),
      };
    case RedemptionMethod.Link:
      return {
        redemptionMethod,
        href: faker.internet.url(),
        linkText: faker.internet.domainName(),
        instructions: faker.lorem.paragraph(),
      };
    case RedemptionMethod.Manual:
      return {
        redemptionMethod,
        instructions: faker.lorem.paragraph(),
      };
  }
}
