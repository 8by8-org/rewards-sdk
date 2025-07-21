import { describe, it, expect } from 'vitest';
import { createRandomPoint } from '../../../util/testing';
import { IPointSchema } from '../../../schema';

describe('createRandomPoint', () => {
  it('creates a random point.', () => {
    const maybePoint = createRandomPoint();
    const isPoint = IPointSchema.safeParse(maybePoint).success;
    expect(isPoint).toBe(true);
  });
});
