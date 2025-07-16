import express, { type Express, type Request } from "express";
import { z, ZodError } from "zod";
import { getRewardsParamsSchema } from "../schema";
import type { Server } from "node:http";
import type { IServer, IRewardsService } from "../model";

export abstract class BaseServer implements IServer {
  public static readonly ROUTES = {
    getRewards: "getRewards",
    getAllRewardCategories: "getAllRewardCategories",
    claimReward: "claimReward",
  };

  public static readonly AUTHORIZATION_HEADER = "authorization";
  public static readonly AUTHORIZATION_SCHEME = "Bearer";
  protected readonly app: Express = express();
  protected server: Server | null = null;

  constructor(private readonly rewardsService: IRewardsService) {
    this.initMiddleware();
    this.initRoutes();
  }

  public start(port: number): void {
    this.server = this.app.listen(port, () => {
      console.log(`Rewards System Server is listening on port ${port}! 🏆`);
    });
  }

  public stop() {
    this.server?.close(() => {
      console.log(`Rewards System Server was stopped.`);
    });
  }

  protected abstract isAuthorized(apiKey: string): Promise<boolean>;
  protected abstract handleUnauthorizedAccessAttempt(
    req: Request
  ): void | Promise<void>;

  protected initMiddleware(): void {
    this.app.use(express.json());
  }

  protected initRoutes(): void {
    this.app.post(BaseServer.ROUTES.getRewards, async (req, res) => {
      try {
        const data = req.body;
        const parsedData = getRewardsParamsSchema.parse(data);
        const rewards = await this.rewardsService.getRewards(parsedData);
        res.json(rewards);
      } catch (e) {
        if (e instanceof ZodError) {
          res.sendStatus(400);
        } else {
          res.sendStatus(500);
        }
      }
    });

    this.app.post(
      BaseServer.ROUTES.getAllRewardCategories,
      async (_req, res) => {
        try {
          const categories = await this.rewardsService.getAllRewardCategories();
          res.json(categories);
        } catch (e) {
          res.sendStatus(400);
        }
      }
    );

    this.app.post(BaseServer.ROUTES.claimReward, async (req, res) => {
      const apiKey = this.extractAPIKeyFromRequest(req);

      if (!apiKey || !this.isAuthorized(apiKey)) {
        await this.handleUnauthorizedAccessAttempt(req);
        res.sendStatus(401);
        return;
      }

      try {
        const data = req.body;
        const rewardId = z.string().parse(data.rewardId);
        const vouchers = await this.rewardsService.claimReward(rewardId);
        res.json(vouchers);
      } catch (e) {
        if (e instanceof ZodError) {
          res.sendStatus(400);
        } else {
          res.sendStatus(500);
        }
      }
    });
  }

  protected extractAPIKeyFromRequest(request: Request) {
    const authorizationHeaderValue =
      request.headers[BaseServer.AUTHORIZATION_HEADER];
    if (authorizationHeaderValue) {
      const parts = authorizationHeaderValue.split(" ");
      if (parts.length === 2 && parts[0] === BaseServer.AUTHORIZATION_SCHEME) {
        return parts[1];
      }
    }
    return null;
  }
}
