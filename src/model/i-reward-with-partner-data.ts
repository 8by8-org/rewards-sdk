import type { IReward } from './i-reward';

/**
 * A reward object populated with information about the partner offering the
 * reward.
 */
export interface IRewardWithPartnerData extends IReward {
  /**
   * The human-readable name of the partner offering this reward.
   */
  partnerName: string;
  /**
   * A description of the partner offering this reward. Formatted as markdown.
   * Optional.
   */
  partnerDescription: string;
  /**
   * The url of the website of the partner offering this reward. Optional.
   */
  partnerWebsite?: string;
  /**
   * A description of why the partner offering this reward supports the 8by8
   * cause. Formatted as markdown. Optional.
   */
  partnerWhy8by8?: string;
}
