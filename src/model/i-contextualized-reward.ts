import type { IRewardWithPartnerData } from './i-reward-with-partner-data';
import type { IPoint } from './i-point';

/**
 * A reward object populated with additional contextual information including
 * information about the partner offering the reward, coordinates for that
 * partner's nearest location, etc.
 */
export interface IContextualizedReward extends IRewardWithPartnerData {
  /**
   * The latitude and longitude coordinates of the partner location nearest
   * the user. Can be undefined if the given partner has no physical locations
   * recorded in the rewards system or if user coordinates were not provided
   * to the query that returned this object.
   */
  nearestLocationCoordinates?: IPoint;
  /**
   * The distance in meters from the user's location to the nearest partner
   * location. Can be undefined if the given partner has no physical locations
   * recorded in the rewards system or if user coordinates were not provided
   * to the query that returned this object.
   */
  distanceToNearestLocation?: number;
}
