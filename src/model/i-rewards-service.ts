import type { IContextualizedReward } from "./i-contextualized-reward";
import type { IPoint } from "./i-point";
import type { IVoucher } from "./i-voucher";
import type { RedemptionForumFilter } from "./redemption-forum-filter";
import type { SortOrder } from "./sort-order";

export interface IRewardsService {
  getRewards(opts?: GetRewardsOpts): Promise<IContextualizedReward[]>;
  getAllRewardCategories(): Promise<string[]>;
  claimReward(rewardId: string): Promise<IVoucher[]>;
}

export interface GetRewardsOpts {
  redemptionForumFilter?: RedemptionForumFilter;
  sortOrder?: SortOrder;
  userCoordinates?: IPoint;
  cursor?: RewardsCursor;
  categories?: string[];
  maxDistance?: number;
  ignoreMaxDistanceForOnlineRewards?: boolean;
  maxNumResults?: number;
}

export interface RewardsCursor {
  partnerName: string;
  rewardId: string;
}
