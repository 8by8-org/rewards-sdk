import { faker } from '@faker-js/faker';
import { RedemptionMethod } from '../constants';
import type { IVoucher } from '../schema';

/**
 * Creates a random {@link IVoucher} object. Useful development and testing.
 *
 * @param redemptionMethod - If provided, the
 * corresponding variant of {@link IVoucher} will be created. If omitted, this
 * value will be selected randomly, and then the corresponding variant of
 * {@link IVoucher} will be created.
 *
 * @returns An {@link IVoucher} object.
 */
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
