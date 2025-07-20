import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { GetContextualizedRewardsOptsPipe } from './get-contextualized-rewards-opts-pipe';
import { API_ROUTES } from '../constants';
import type {
  GetContextualizedRewardsOpts,
  IContextualizedReward,
  IRewardsService,
  IVoucher,
} from '../model';

@Controller()
export abstract class BaseRewardsController implements IRewardsService {
  protected abstract _getContextualizedRewards(
    opts?: GetContextualizedRewardsOpts,
  ): Promise<IContextualizedReward[]>;
  protected abstract _getAllRewardCategories(): Promise<string[]>;
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

  @Post(API_ROUTES.claimReward)
  async claimReward(@Body('rewardId') rewardId: string): Promise<IVoucher[]> {
    const vouchers = await this._claimReward(rewardId);
    return vouchers;
  }
}
