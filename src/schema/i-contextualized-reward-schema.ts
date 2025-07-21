import { z } from 'zod';
import { IRewardWithPartnerDataSchema } from './i-reward-with-partner-data-schema';
import { IPointSchema } from './i-point-schema';

export const IContextualizedRewardSchema = IRewardWithPartnerDataSchema.extend({
  /**
   * The latitude and longitude coordinates of the partner location nearest
   * the user. Can be undefined if the given partner has no physical locations
   * recorded in the rewards system or if user coordinates were not provided
   * to the query that returned this object.
   */
  nearestLocationCoordinates: IPointSchema.optional(),
  /**
   * The distance in meters from the user's location to the nearest partner
   * location. Can be undefined if the given partner has no physical locations
   * recorded in the rewards system or if user coordinates were not provided
   * to the query that returned this object.
   */
  distanceToNearestLocation: z.number().optional(),
});

/**
 * A reward object populated with additional contextual information including
 * information about the partner offering the reward, coordinates for that
 * partner's nearest location, etc.
 */
export type IContextualizedReward = z.infer<typeof IContextualizedRewardSchema>;
