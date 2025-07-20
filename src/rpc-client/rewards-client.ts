import { z } from 'zod';
import qs from 'query-string';
import { AuthorizationHeaderConverter } from '../rpc-shared/authorization-header-converter';
import { QueryParamsConverter } from '../rpc-shared/query-params-converter';
import { API_ROUTES } from '../constants';
import { HttpError } from './http-error';
import type {
  GetContextualizedRewardsOpts,
  IContextualizedReward,
  IRewardsService,
  IVoucher,
} from '../model';
import { contextualizedRewardSchema, voucherSchema } from '../schema';

export class RewardsClient implements IRewardsService {
  constructor(
    private apiUrl: string,
    private apiKey?: string,
  ) {}

  async getContextualizedRewards(
    opts?: GetContextualizedRewardsOpts,
  ): Promise<IContextualizedReward[]> {
    const queryParams = opts ? QueryParamsConverter.toQueryParams(opts) : {};
    const queryString = qs.stringify(queryParams);
    const endPoint = `${this.apiUrl}/${API_ROUTES.getContextualizedRewards}?${queryString}`;

    const request: RequestInit = {
      method: 'GET',
    };

    if (this.apiKey) {
      request.headers = AuthorizationHeaderConverter.toHeaderFromAPIKey(
        this.apiKey,
      );
    }

    const response = await fetch(endPoint, request);

    if (response.ok) {
      const data = await response.json();
      const parsed = contextualizedRewardSchema.array().parse(data);
      return parsed;
    } else {
      throw new HttpError(
        'Failed to retrieve rewards.',
        response.status,
        response.statusText,
      );
    }
  }

  async getAllRewardCategories(): Promise<string[]> {
    const endPoint = `${this.apiUrl}/${API_ROUTES.getAllRewardCategories}`;

    const request: RequestInit = {
      method: 'GET',
    };

    if (this.apiKey) {
      request.headers = AuthorizationHeaderConverter.toHeaderFromAPIKey(
        this.apiKey,
      );
    }

    const response = await fetch(endPoint, request);

    if (response.ok) {
      const data = await response.json();
      const parsed = z.string().array().parse(data);
      return parsed;
    } else {
      throw new HttpError(
        'Failed to retrieve reward categories.',
        response.status,
        response.statusText,
      );
    }
  }

  async claimReward(rewardId: string): Promise<IVoucher[]> {
    const endPoint = `${this.apiUrl}/${API_ROUTES.claimReward}`;

    const request: RequestInit = {
      method: 'POST',
      body: JSON.stringify({ rewardId }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (this.apiKey) {
      request.headers = {
        ...request.headers,
        ...AuthorizationHeaderConverter.toHeaderFromAPIKey(this.apiKey),
      };
    }

    const response = await fetch(endPoint, request);

    if (response.ok) {
      const data = await response.json();
      const parsed = voucherSchema.array().parse(data);
      return parsed;
    } else {
      throw new HttpError(
        'Failed to claim reward.',
        response.status,
        response.statusText,
      );
    }
  }
}
