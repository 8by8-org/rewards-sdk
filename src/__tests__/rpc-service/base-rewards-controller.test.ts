import { describe, beforeEach, vi, it, expect, type Mock } from "vitest";
import { faker } from "@faker-js/faker";
import { Test, TestingModule } from "@nestjs/testing";
import { BaseRewardsController } from "../../rpc";
import {
  RedemptionForumFilter,
  RedemptionMethod,
  SortOrder,
  type GetRewardsOpts,
  type IContextualizedReward,
  type IVoucher,
} from "../../model";
import {
  createRandomOptsObject,
  createRandomReward,
  createRandomVoucher,
  fakeCategories,
} from "../../util/testing";

describe("BaseRewardsController", () => {
  let rewardsController: BaseRewardsController;
  let getRewards: Mock;
  let getAllRewardCategories: Mock;
  let claimReward: Mock;

  beforeEach(async () => {
    getRewards = vi.fn();
    getAllRewardCategories = vi.fn();
    claimReward = vi.fn();

    class DerivedRewardsController extends BaseRewardsController {
      protected _getRewards(
        opts?: GetRewardsOpts
      ): Promise<IContextualizedReward[]> {
        return getRewards(opts);
      }
      protected _getAllRewardCategories(): Promise<string[]> {
        return getAllRewardCategories();
      }
      protected _claimReward(rewardId: string): Promise<IVoucher[]> {
        return claimReward(rewardId);
      }
    }

    const app: TestingModule = await Test.createTestingModule({
      controllers: [DerivedRewardsController],
    }).compile();

    rewardsController = app.get<BaseRewardsController>(
      DerivedRewardsController
    );
  });

  it("passes opts to the _getRewards method of the derived class.", async () => {
    const opts = createRandomOptsObject();
    await rewardsController.getRewards(opts);
    expect(getRewards).toHaveBeenCalledWith(opts);
  });

  it("passes the rewardId to the _claimReward method of the derived class.", async () => {
    const rewardId = faker.string.uuid();
    await rewardsController.claimReward(rewardId);
    expect(claimReward).toHaveBeenCalledWith(rewardId);
  });

  it("returns the rewards returned by the _getRewards method of the derived class.", async () => {
    const expectedRewards: IContextualizedReward[] = [
      ...(function* () {
        for (let i = 0; i < 10; i++) {
          yield createRandomReward();
        }
      })(),
    ];

    getRewards.mockResolvedValueOnce(expectedRewards);
    const actualRewards = await rewardsController.getRewards();
    expect(actualRewards).toEqual(expectedRewards);
  });

  it("returns the categories returned by the _getAllRewardCategories method of the derived class.", async () => {
    const expectedCategories = fakeCategories;
    getAllRewardCategories.mockResolvedValueOnce(expectedCategories);
    const actualCategories = await rewardsController.getAllRewardCategories();
    expect(actualCategories).toEqual(expectedCategories);
  });

  it("returns the vouchers returned by the claimReward method of the derived class.", async () => {
    const expectedVouchers: IVoucher[] = Object.values(RedemptionMethod).map(
      (redemptionMethod) => createRandomVoucher(redemptionMethod)
    );

    claimReward.mockResolvedValueOnce(expectedVouchers);
    const actualVouchers = await rewardsController.claimReward(
      faker.string.uuid()
    );
    expect(actualVouchers).toEqual(expectedVouchers);
  });
});
