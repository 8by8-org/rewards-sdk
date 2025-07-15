import { z } from "zod";
import { API_ROUTES } from "../constants";
import { contextualizedRewardSchema, voucherSchema } from "../schema";
import { provideAPIKeyToRequest } from "../util";
import type {
  IRewardsService,
  GetRewardsOpts,
  IContextualizedReward,
  IVoucher,
} from "../model";

interface RewardsClientConstructorParams {
  apiUrl: string;
  apiKey?: string;
}

export class RewardsClient implements IRewardsService {
  private readonly apiUrl: string;
  private readonly apiKey: string | undefined;

  constructor({ apiUrl, apiKey }: RewardsClientConstructorParams) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  async getRewards(opts?: GetRewardsOpts): Promise<IContextualizedReward[]> {
    const data = await this.executeRemoteProcedure(API_ROUTES.getRewards, opts);
    const parsed = contextualizedRewardSchema.array().parse(data);
    return parsed;
  }

  async getAllRewardCategories(): Promise<string[]> {
    const data = await this.executeRemoteProcedure(
      API_ROUTES.getAllRewardCategories
    );
    const parsed = z.string().array().parse(data);
    return parsed;
  }

  async claimReward(rewardId: string): Promise<IVoucher[]> {
    const data = await this.executeRemoteProcedure(API_ROUTES.claimReward, {
      rewardId,
    });
    const parsed = voucherSchema.array().parse(data);
    return parsed;
  }

  private async executeRemoteProcedure(
    route: (typeof API_ROUTES)[keyof typeof API_ROUTES],
    body?: object
  ) {
    const endpoint = this.apiUrl + "/" + route;

    let requestParams: RequestInit = {
      method: "POST",
    };

    if (this.apiKey) {
      requestParams = provideAPIKeyToRequest(this.apiKey, requestParams);
    }

    if (body) {
      requestParams.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, requestParams);
    const data = await response.json();
    return data;
  }
}
