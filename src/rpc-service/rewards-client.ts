import { z } from "zod";
import { BaseServer } from "./base-server";
import { contextualizedRewardSchema, voucherSchema } from "../schema";
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
    const data = await this.executeRemoteProcedure(
      BaseServer.ROUTES.getRewards,
      opts
    );
    const parsed = contextualizedRewardSchema.array().parse(data);
    return parsed;
  }

  async getAllRewardCategories(): Promise<string[]> {
    const data = await this.executeRemoteProcedure(
      BaseServer.ROUTES.getAllRewardCategories
    );
    const parsed = z.string().array().parse(data);
    return parsed;
  }

  async claimReward(rewardId: string): Promise<IVoucher[]> {
    const data = await this.executeRemoteProcedure(
      BaseServer.ROUTES.claimReward,
      {
        rewardId,
      }
    );
    const parsed = voucherSchema.array().parse(data);
    return parsed;
  }

  private async executeRemoteProcedure(
    route: (typeof BaseServer.ROUTES)[keyof typeof BaseServer.ROUTES],
    body?: object
  ) {
    const endpoint = this.apiUrl + "/" + route;

    const requestParams: RequestInit = {
      method: "POST",
    };

    if (this.apiKey) {
      const authHeaderValue =
        BaseServer.AUTHORIZATION_SCHEME + " " + this.apiKey;

      requestParams.headers = {
        [BaseServer.AUTHORIZATION_HEADER]: authHeaderValue,
      };
    }

    if (body) {
      requestParams.body = JSON.stringify(body);
    }

    const response = await fetch(endpoint, requestParams);
    const data = await response.json();
    return data;
  }
}
