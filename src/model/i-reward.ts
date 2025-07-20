import type { RedemptionForum } from './redemption-forum';

export interface IReward {
  /**
   * A UUID identifying the reward.
   */
  id: string;
  /**
   * A unique ID identifying the partner offering this reward, for example
   * "joes-famous-restaurant".
   */
  partnerId: string;
  /**
   * A short description of the reward, for example "$10 off your next purchase
   * of $40+"
   */
  shortDescription: string;
  /**
   * An array of {@link RedemptionForum}s, representing how the reward can
   * be redeemed, i.e. in-store, online, or both.
   */
  redemptionForums: RedemptionForum[];
  /**
   * A list of categories that describe the nature of the reward. Categories
   * could include things such as "Arts and Entertainment" or "Health and Beauty"
   * but ultimately can each be any string.
   */
  categories: string[];
  /**
   * A long description for the reward. This might include things such as
   * terms of service or other details about claiming the reward. Formatted as
   * markdown. Optional.
   */
  longDescription?: string;
  /**
   * The date from which the reward will no longer be offered. This may also
   * reflect the date from which the reward will no longer be redeemable.
   * Optional.
   */
  expirationDate?: Date;
}
