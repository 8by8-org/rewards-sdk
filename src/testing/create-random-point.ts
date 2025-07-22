import { faker } from '@faker-js/faker';
import type { IPoint } from '../schema';

/**
 * Creates a random {@link IPoint} object. Useful for development and testing.
 *
 * @returns An {@link IPoint} object.
 */
export function createRandomPoint(): IPoint {
  const point: IPoint = {
    latitude: faker.location.latitude(),
    longitude: faker.location.longitude(),
  };

  return point;
}
