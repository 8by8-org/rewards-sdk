import { faker } from '@faker-js/faker';
import type { IPartner } from '../schema';

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
