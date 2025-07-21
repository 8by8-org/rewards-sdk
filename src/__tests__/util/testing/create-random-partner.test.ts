import { describe, it, expect } from 'vitest';
import { createRandomPartner } from '../../../testing';
import { IPartnerSchema } from '../../../schema';

describe('createRandomPartner', () => {
  it('creates a random partner.', () => {
    const maybePartner = createRandomPartner();
    const isPartner = IPartnerSchema.safeParse(maybePartner).success;
    expect(isPartner).toBe(true);
  });

  it('overrides random options with set options.', () => {
    const opts = createRandomPartner();
    const partner = createRandomPartner(opts);
    expect(partner).toEqual(opts);
  });
});
