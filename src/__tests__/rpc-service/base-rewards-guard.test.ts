import { describe, beforeEach, vi, it, expect, type Mock } from 'vitest';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UseGuards, type INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import {
  BaseRewardsGuard,
  BaseRewardsController,
  RewardsClient,
} from '../../rpc';
import { Observable } from 'rxjs';
import {
  GetRewardsOpts,
  type IContextualizedReward,
  type IVoucher,
} from '../../model';
import { API_ROUTES } from '../../constants';

describe('AppController (e2e)', () => {
  let testingModule: TestingModule;
  let canActivate: Mock;

  beforeEach(async () => {
    canActivate = vi.fn(() => true);

    class DerivedRewardsGuard extends BaseRewardsGuard {
      protected _canActivate(
        path: string,
        apiKey?: string,
      ): boolean | Promise<boolean> | Observable<boolean> {
        return canActivate(path, apiKey);
      }
    }

    @UseGuards(DerivedRewardsGuard)
    class DerivedRewardsController extends BaseRewardsController {
      protected _getRewards(
        _opts?: GetRewardsOpts,
      ): Promise<IContextualizedReward[]> {
        return Promise.resolve([]);
      }
      protected _getAllRewardCategories(): Promise<string[]> {
        return Promise.resolve([]);
      }
      protected _claimReward(_rewardId: string): Promise<IVoucher[]> {
        return Promise.resolve([]);
      }
    }

    testingModule = await Test.createTestingModule({
      controllers: [DerivedRewardsController],
    }).compile();
  });

  it('retrieves the path and apiKey from a request when invoked within an Express-based app.', async () => {
    const app: INestApplication = testingModule.createNestApplication();
    await app.init();
    await app.listen(3000);
    const apiUrl = await app.getUrl();
    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient(apiUrl, apiKey);
    await rewardsClient.getRewards();
    expect(canActivate).toHaveBeenCalledWith(
      '/' + API_ROUTES.getRewards,
      apiKey,
    );
    await app.close();
  });

  it('retrieves the path and apiKey from a request when invoked within a Fastify-based app.', async () => {
    const app: INestApplication = testingModule.createNestApplication(
      new FastifyAdapter(),
    );
    await app.init();
    await app.listen(3000);
    const apiUrl = await app.getUrl();
    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient(apiUrl, apiKey);
    await rewardsClient.getRewards();
    expect(canActivate).toHaveBeenCalledWith(
      '/' + API_ROUTES.getRewards,
      apiKey,
    );
    await app.close();
  });
});
