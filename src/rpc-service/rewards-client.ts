import { object, z } from "zod";
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
    let endpoint = this.apiUrl + "/" + BaseServer.ROUTES.getRewards;

    if (opts && Object.keys(opts).length > 1) {
      const queryParams: string[] = [];

      Object.entries(opts).forEach(([opt, value]) => {
        if (typeof value === "object") {
          value = JSON.stringify(value);
        }
        opt = encodeURIComponent(opt);
        value = encodeURIComponent(value);
        const queryParam = opt + "=" + value;
        queryParams.push(queryParam);
      });

      const queryString = "?" + queryParams.join("&");
      endpoint += queryString;
    }

    const request = this.createAPIRequest("GET");
    const response = await fetch(endpoint, request);
    const data = await response.json();
    const parsed = contextualizedRewardSchema.array().parse(data);
    return parsed;
  }

  async getAllRewardCategories(): Promise<string[]> {
    const endpoint =
      this.apiUrl + "/" + BaseServer.ROUTES.getAllRewardCategories;
    const request = this.createAPIRequest("GET");
    const response = await fetch(endpoint, request);
    const data = await response.json();
    const parsed = z.string().array().parse(data);
    return parsed;
  }

  async claimReward(rewardId: string): Promise<IVoucher[]> {
    const endpoint = this.apiUrl + "/" + BaseServer.ROUTES.claimReward;
    const request = this.createAPIRequest("POST", {
      rewardId,
    });
    const response = await fetch(endpoint, request);
    const data = await response.json();
    const parsed = voucherSchema.array().parse(data);
    return parsed;
  }

  private createAPIRequest(method: string, body?: object): RequestInit {
    const request: RequestInit = {
      method,
    };

    if (this.apiKey) {
      request.headers = {
        [BaseServer.AUTHORIZATION_HEADER]: `${BaseServer.AUTHORIZATION_SCHEME} ${this.apiKey}`,
      };
    }

    if (body) {
      request.body = JSON.stringify(body);
    }

    return request;
  }
}
