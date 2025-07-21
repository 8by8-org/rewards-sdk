import { faker } from '@faker-js/faker';
import type { IPoint } from '../schema';

export function createRandomPoint(): IPoint {
  const point: IPoint = {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };

  return point;
}
