import { z } from 'zod';
import { RedemptionForum } from '../constants';

/**
 * A reward that can be claimed through the 8by8 rewards system, via a
 * user-facing 8by8 application.
 */
export const IRewardSchema = z.object({
  /**
   * A UUID identifying the reward.
   */
  id: z.uuid(),
  /**
   * A unique ID identifying the partner offering this reward, for example
   * "joes-famous-restaurant".
   */
  partnerId: z.string(),
  /**
   * A short description of the reward, for example "$10 off your next purchase
   * of $40+"
   */
  shortDescription: z.string(),
  /**
   * An array of {@link RedemptionForum}s, representing how the reward can
   * be redeemed, i.e. in-store, online, or both.
   */
  redemptionForums: z.enum(RedemptionForum).array(),
  /**
   * A list of categories that describe the nature of the reward. Categories
   * could include things such as "Arts and Entertainment" or "Health and Beauty"
   * but ultimately can each be any string.
   */
  categories: z.string().array(),
  /**
   * A long description for the reward. This might include things such as
   * terms of service or other details about claiming the reward. Formatted as
   * markdown. Optional.
   */
  longDescription: z.string().optional(),
  /**
   * The date from which the reward will no longer be offered. This may also
   * reflect the date from which the reward will no longer be redeemable.
   * Optional.
   */
  expirationDate: z.coerce.date().optional(),
});

/**
 * A reward that can be claimed through the 8by8 rewards system, via a
 * user-facing 8by8 application.
 */
export type IReward = z.infer<typeof IRewardSchema>;
