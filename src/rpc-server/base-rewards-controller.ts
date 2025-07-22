import {
  Controller,
  Get,
  Post,
  Query,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { GetContextualizedRewardsOptsPipe } from './get-contextualized-rewards-opts-pipe';
import { API_ROUTES } from '../constants';
import type {
  GetContextualizedRewardsOpts,
  IContextualizedReward,
  IRewardsService,
  IRewardWithPartnerData,
  IVoucher,
} from '../schema';
// eslint-disable-next-line
import type { RewardsClient } from '../rpc-client';

/**
 * A controller that implements the API routes expected by the
 * {@link RewardsClient}.
 *
 * Derived classes must define how the data returned by these routes is
 * retrieved. Derived classes are also responsible for applying guards,
 * interceptors, etc.
 */
@Controller()
export abstract class BaseRewardsController implements IRewardsService {
  /**
   * Retrieves a list of {@link IContextualizedReward}s, filtering, sorting,
   * abridging, and further contextualizing its results according to the
   * provided options.
   *
   * @param opts - {@link GetContextualizedRewardsOpts}
   */
  protected abstract _getContextualizedRewards(
    opts?: GetContextualizedRewardsOpts,
  ): Promise<IContextualizedReward[]>;

  /**
   * Retrieves an array of all distinct reward categories present in the rewards
   * system.
   */
  protected abstract _getAllRewardCategories(): Promise<string[]>;

  /**
   * Retrieves a specific reward populated with its partner's data, querying the
   * rewards system by the reward id. It should return `null` if no such reward
   * is found.
   *
   * @param rewardId - The id of the reward to retrieve.
   */
  protected abstract _getRewardWithPartnerData(
    rewardId: string,
  ): Promise<IRewardWithPartnerData | null>;

  /**
   * Claims the reward with the provided id, returning a list of
   * {@link IVoucher}s. If no such reward is found, an error should be thrown.
   *
   * @param rewardId - The id of the reward to claim.
   */
  protected abstract _claimReward(rewardId: string): Promise<IVoucher[]>;

  @Get(API_ROUTES.getContextualizedRewards)
  async getContextualizedRewards(
    @Query(new GetContextualizedRewardsOptsPipe())
    opts?: GetContextualizedRewardsOpts,
  ): Promise<IContextualizedReward[]> {
    const rewards = await this._getContextualizedRewards(opts);
    return rewards;
  }

  @Get(API_ROUTES.getAllRewardCategories)
  async getAllRewardCategories(): Promise<string[]> {
    const categories = await this._getAllRewardCategories();
    return categories;
  }

  @Get(API_ROUTES.getRewardWithPartnerData)
  async getRewardWithPartnerData(
    @Query('rewardId') rewardId: string,
  ): Promise<IRewardWithPartnerData> {
    const reward = await this._getRewardWithPartnerData(rewardId);

    if (!reward) {
      throw new NotFoundException(`Failed to find reward with id ${rewardId}.`);
    }

    return reward;
  }

  @Post(API_ROUTES.claimReward)
  async claimReward(@Body('rewardId') rewardId: string): Promise<IVoucher[]> {
    const vouchers = await this._claimReward(rewardId);
    return vouchers;
  }
}
