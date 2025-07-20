import { faker } from "@faker-js/faker";
import { RedemptionMethod, type IVoucher } from "../../model";

export function createRandomVoucher(
  redemptionMethod: RedemptionMethod
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
