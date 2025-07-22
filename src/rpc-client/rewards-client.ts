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
  IRewardWithPartnerData,
  IVoucher,
} from '../schema';
import {
  IContextualizedRewardSchema,
  IRewardWithPartnerDataSchema,
  IVoucherSchema,
} from '../schema';

/**
 * An object provided to the constructor of the {@link RewardsClient} to
 * configure a new instance.
 */
export interface RewardsClientConstructorParams {
  /**
   * The url of the rewards system server that the client should talk to.
   */
  apiUrl: string;
  /**
   * The API key that the client should provide to the server via headers.
   * This should be omitted if the client is instantiated in the front-end of
   * an application.
   */
  apiKey?: string;
}

/**
 * A client that is preconfigured to talk to a rewards system server.
 */
export class RewardsClient implements IRewardsService {
  private apiUrl: string;
  private apiKey?: string;

  constructor({ apiUrl, apiKey }: RewardsClientConstructorParams) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

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
      const parsed = IContextualizedRewardSchema.array().parse(data);
      return parsed;
    } else {
      throw new HttpError(response.statusText, response.status);
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
      throw new HttpError(response.statusText, response.status);
    }
  }

  async getRewardWithPartnerData(
    rewardId: string,
  ): Promise<IRewardWithPartnerData> {
    const endPoint = `${this.apiUrl}/${API_ROUTES.getRewardWithPartnerData}?rewardId=${rewardId}`;

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
      const parsed = IRewardWithPartnerDataSchema.parse(data);
      return parsed;
    } else {
      throw new HttpError(response.statusText, response.status);
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
      const parsed = IVoucherSchema.array().parse(data);
      return parsed;
    } else {
      throw new HttpError(response.statusText, response.status);
    }
  }
}
