import type { IContextualizedReward } from './i-contextualized-reward';
import type { IPoint } from './i-point';
import type { IRewardWithPartnerData } from './i-reward-with-partner-data';
import type { IVoucher } from './i-voucher';
import type { RedemptionForumFilter } from './redemption-forum-filter';
import type { SortOrder } from './sort-order';
// eslint-disable-next-line
import type { RedemptionForum } from './redemption-forum';

/**
 * The interface that stubs of the rewards system RPC service must implement.
 */
export interface IRewardsService {
  /**
   * Retrieves an array of {@link IContextualizedReward}s, depending on the
   * opts it receives.
   *
   * @param opts - {@link GetContextualizedRewardsOpts}
   */
  getContextualizedRewards(
    opts?: GetContextualizedRewardsOpts,
  ): Promise<IContextualizedReward[]>;

  /**
   * Retrieves an array of all distinct reward categories represented in the
   * rewards system.
   */
  getAllRewardCategories(): Promise<string[]>;

  /**
   * Retrieves a single reward together with corresponding partner data, using
   * the provided `rewardId` to query the reward systems. If a reward is not
   * found, an error should be thrown.
   *
   * @param rewardId - The ID of the reward to retrieve.
   */
  getRewardWithPartnerData(rewardId: string): Promise<IRewardWithPartnerData>;

  /**
   * Claims the reward with the provided `rewardId`, returning an array of
   * {@link IVoucher}s which the user can provide to the partner to redeem
   * their reward.
   *
   * @param rewardId - The ID of the reward to claim.
   */
  claimReward(rewardId: string): Promise<IVoucher[]>;
}

/**
 * Options that can be provided to {@link IRewardsService.getContextualizedRewards}
 * to filter, sort, abridge, and/or further contextualize results.
 */
export interface GetContextualizedRewardsOpts {
  /**
   * Determines what rewards should be returned depending on their
   * {@link RedemptionForum}s.
   */
  redemptionForumFilter?: RedemptionForumFilter;
  /**
   * Results, which are sorted according to their `partnerName` and `id` fields,
   * should be ordered by this value.
   */
  sortOrder?: SortOrder;
  /**
   * Coordinates used to query the rewards system for the nearest partner
   * location and distance to that location. If undefined, the rewards system
   * will not be queried for these values, and `nearestLocationCoordinates` and
   * `distanceToNearestLocation` will be undefined in each result. Note that
   * these values can still be undefined if a given partner has no
   * physical locations recorded in the rewards system.
   *
   * If omitted, `maxDistance` will have no effect on the query.
   */
  userCoordinates?: IPoint;
  /**
   * The partner name and reward id to begin querying the rewards system
   * *after*, according to the provided {@link SortOrder}.
   */
  cursor?: RewardsCursor;
  /**
   * The categories to filter results by. If included and not empty, only
   * rewards whose categories field includes at least one of the provided
   * categories will be returned.
   *
   * If omitted, or if an empty array is
   * provided, this filter is not applied, and all relevant results are returned
   * regardless of the categories to which they belong.
   */
  categories?: string[];
  /**
   * The maximum distance (in meters) that the nearest partner location can be
   * from the user in order for that partner's rewards to be included in
   * the results. This has no effect on results if user coordinates are not
   * also provided.
   */
  maxDistance?: number;
  /**
   * If true, `maxDistance` will be ignored for rewards that can be redeemed
   * online (even if they can also be redeemed in-store).
   */
  ignoreMaxDistanceForOnlineRewards?: boolean;
  /**
   * The maximum number of results to return. If omitted, all rewards will be
   * returned.
   */
  maxNumResults?: number;
}

/**
 * The partner name and reward id to begin querying the rewards system
 * *after*, according to the provided {@link SortOrder}.
 */
export interface RewardsCursor {
  partnerName: string;
  rewardId: string;
}
