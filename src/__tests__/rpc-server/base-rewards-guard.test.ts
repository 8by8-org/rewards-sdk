import { describe, beforeEach, vi, it, expect, type Mock } from 'vitest';
import { faker } from '@faker-js/faker';
import { Test, TestingModule } from '@nestjs/testing';
import { UseGuards, type INestApplication } from '@nestjs/common';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { BaseRewardsGuard, BaseRewardsController } from '../../rpc-server';
import { RewardsClient } from '../../rpc-client';
import { Observable } from 'rxjs';
import type {
  IContextualizedReward,
  IRewardWithPartnerData,
  IVoucher,
} from '../../schema';
import { API_ROUTES } from '../../constants';
import { createRandomRewardWithPartnerData } from '../../util/testing';

describe('AppController (e2e)', () => {
  let testingModule: TestingModule;
  let canActivate: Mock;
  const ipAddressPattern = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;

  beforeEach(async () => {
    canActivate = vi.fn((path, ip, apiKey) => {
      console.log(ip);
      return true;
    });

    class DerivedRewardsGuard extends BaseRewardsGuard {
      protected _canActivate(
        path: string,
        ip: string,
        apiKey?: string,
      ): boolean | Promise<boolean> | Observable<boolean> {
        return canActivate(path, ip, apiKey);
      }
    }

    @UseGuards(DerivedRewardsGuard)
    class DerivedRewardsController extends BaseRewardsController {
      protected _getContextualizedRewards(): Promise<IContextualizedReward[]> {
        return Promise.resolve([]);
      }

      protected _getAllRewardCategories(): Promise<string[]> {
        return Promise.resolve([]);
      }

      protected _getRewardWithPartnerData(): Promise<IRewardWithPartnerData | null> {
        return Promise.resolve(createRandomRewardWithPartnerData());
      }

      protected _claimReward(): Promise<IVoucher[]> {
        return Promise.resolve([]);
      }
    }

    testingModule = await Test.createTestingModule({
      controllers: [DerivedRewardsController],
    }).compile();
  });

  it('retrieves the path, ip, and apiKey from a request when invoked within an Express-based app.', async () => {
    const app: INestApplication = testingModule.createNestApplication();
    await app.init();
    await app.listen(8888, '0.0.0.0');
    const apiUrl = await app.getUrl();
    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient({ apiUrl, apiKey });
    await rewardsClient.getContextualizedRewards();
    expect(canActivate).toHaveBeenCalledWith(
      '/' + API_ROUTES.getContextualizedRewards,
      expect.stringMatching(ipAddressPattern),
      apiKey,
    );
    await app.close();
  });

  it('retrieves the path, ip, apiKey from a request when invoked within a Fastify-based app.', async () => {
    const app: INestApplication = testingModule.createNestApplication(
      new FastifyAdapter(),
    );
    await app.init();
    await app.listen(8888, '0.0.0.0');
    const apiUrl = await app.getUrl();
    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient({ apiUrl, apiKey });
    await rewardsClient.getContextualizedRewards();
    expect(canActivate).toHaveBeenCalledWith(
      '/' + API_ROUTES.getContextualizedRewards,
      expect.stringMatching(ipAddressPattern),
      apiKey,
    );
    await app.close();
  });
});
