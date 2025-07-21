import { z } from 'zod';
import { IRewardSchema } from './i-reward-schema';

/**
 * A reward object populated with information about the partner offering the
 * reward.
 */
export const IRewardWithPartnerDataSchema = IRewardSchema.extend({
  /**
   * The human-readable name of the partner offering this reward.
   */
  partnerName: z.string(),
  /**
   * The url for the partner's logo. All partner logos should be expected to
   * have a 1:1 aspect ratio.
   */
  partnerLogoUrl: z.string(),
  /**
   * A description of the partner offering this reward. Formatted as markdown.
   */
  partnerDescription: z.string(),
  /**
   * The url of the website of the partner offering this reward. Optional.
   */
  partnerWebsite: z.string().optional(),
  /**
   * A description of why the partner offering this reward supports the 8by8
   * cause. Formatted as markdown. Optional.
   */
  partnerWhy8by8: z.string().optional(),
});

/**
 * A reward object populated with information about the partner offering the
 * reward.
 */
export type IRewardWithPartnerData = z.infer<
  typeof IRewardWithPartnerDataSchema
>;
