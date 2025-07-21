import { describe, beforeEach, vi, it, expect, type Mock } from 'vitest';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { BaseRewardsController } from '../../rpc-server';
import { RedemptionMethod } from '../../constants';
import type {
  IRewardWithPartnerData,
  GetContextualizedRewardsOpts,
  IContextualizedReward,
  IVoucher,
} from '../../schema';
import {
  createRandomOptsObject,
  createRandomContextualizedReward,
  createRandomVoucher,
  fakeCategories,
  createRandomRewardWithPartnerData,
} from '../../util/testing';

describe('BaseRewardsController', () => {
  let rewardsController: BaseRewardsController;
  let getContextualizedRewards: Mock;
  let getAllRewardCategories: Mock;
  let getRewardWithPartnerData: Mock;
  let claimReward: Mock;

  beforeEach(async () => {
    getContextualizedRewards = vi.fn();
    getAllRewardCategories = vi.fn();
    getRewardWithPartnerData = vi.fn();
    claimReward = vi.fn();

    class DerivedRewardsController extends BaseRewardsController {
      protected _getContextualizedRewards(
        opts?: GetContextualizedRewardsOpts,
      ): Promise<IContextualizedReward[]> {
        return getContextualizedRewards(opts);
      }
      protected _getAllRewardCategories(): Promise<string[]> {
        return getAllRewardCategories();
      }
      protected _claimReward(rewardId: string): Promise<IVoucher[]> {
        return claimReward(rewardId);
      }
      protected _getRewardWithPartnerData(
        rewardId: string,
      ): Promise<IRewardWithPartnerData | null> {
        return getRewardWithPartnerData(rewardId);
      }
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [DerivedRewardsController],
    }).compile();

    rewardsController = app.get<BaseRewardsController>(
      DerivedRewardsController,
    );
  });

  it('passes opts to the _getContextualizedRewards method of the derived class.', async () => {
    const opts = createRandomOptsObject();
    await rewardsController.getContextualizedRewards(opts);
    expect(getContextualizedRewards).toHaveBeenCalledWith(opts);
  });

  it('passes the rewardId to the _getRewardWithPartnerData method of the derived class.', async () => {
    const rewardId = faker.string.uuid();
    getRewardWithPartnerData.mockResolvedValueOnce(
      createRandomRewardWithPartnerData({ id: rewardId }),
    );
    await rewardsController.getRewardWithPartnerData(rewardId);
    expect(getRewardWithPartnerData).toHaveBeenCalledWith(rewardId);
  });

  it('passes the rewardId to the _claimReward method of the derived class.', async () => {
    const rewardId = faker.string.uuid();
    await rewardsController.claimReward(rewardId);
    expect(claimReward).toHaveBeenCalledWith(rewardId);
  });

  it('returns the rewards returned by the _getContextualizedRewards method of the derived class.', async () => {
    const expectedRewards: IContextualizedReward[] = [
      ...(function* () {
        for (let i = 0; i < 10; i++) {
          yield createRandomContextualizedReward();
        }
      })(),
    ];

    getContextualizedRewards.mockResolvedValueOnce(expectedRewards);
    const actualRewards = await rewardsController.getContextualizedRewards();
    expect(actualRewards).toEqual(expectedRewards);
  });

  it('returns the categories returned by the _getAllRewardCategories method of the derived class.', async () => {
    const expectedCategories = fakeCategories;
    getAllRewardCategories.mockResolvedValueOnce(expectedCategories);
    const actualCategories = await rewardsController.getAllRewardCategories();
    expect(actualCategories).toEqual(expectedCategories);
  });

  it('returns the reward returned by the _getRewardWithPartnerData method of the derived class.', async () => {
    const expectedReward = createRandomRewardWithPartnerData();
    getRewardWithPartnerData.mockResolvedValueOnce(expectedReward);
    const actualReward = await rewardsController.getRewardWithPartnerData(
      expectedReward.id,
    );
    expect(actualReward).toEqual(expectedReward);
  });

  it('returns the vouchers returned by the claimReward method of the derived class.', async () => {
    const expectedVouchers: IVoucher[] = Object.values(RedemptionMethod).map(
      redemptionMethod => createRandomVoucher(redemptionMethod),
    );

    claimReward.mockResolvedValueOnce(expectedVouchers);
    const actualVouchers = await rewardsController.claimReward(
      faker.string.uuid(),
    );
    expect(actualVouchers).toEqual(expectedVouchers);
  });

  it('throws an error if no reward is found when getRewardWithPartnerData is called.', async () => {
    getRewardWithPartnerData.mockResolvedValueOnce(null);
    await expect(
      rewardsController.getRewardWithPartnerData(faker.string.uuid()),
    ).rejects.toThrow();
  });
});
