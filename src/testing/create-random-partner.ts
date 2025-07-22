import { faker } from '@faker-js/faker';
import type { IPartner } from '../schema';

/**
 * Creates a random {@link IPartner} object. Useful for development and testing.
 *
 * @param opts - A partial {@link IPartner} object. Allows the developer to
 * override specific random values with hard-coded ones. If omitted, all values
 * will be random.
 *
 * @returns An {@link IPartner} object.
 */
export function createRandomPartner(opts?: Partial<IPartner>): IPartner {
  const partner: IPartner = {
    id: faker.lorem.slug(),
    name: faker.company.name(),
    logoUrl: faker.image.url({ width: 400, height: 400 }),
    description: faker.lorem.paragraph(),
    ...opts,
  };

  return partner;
}
