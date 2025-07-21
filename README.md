# Rewards SDK

This is the software development kit for implementing the 8by8 Rewards System.

The package provides shared types, a client stub for the rewards system RPC, a
[NestJS](https://nestjs.com/) controller than can be derived from to implement the server, and more.

## Project Requirements

In the `tsconfig.json` file for your project, ensure that `moduleResolution` is
set to `node16`, `nodenext`, or `bundler` for compatibility with
[submodule exports](https://nodejs.org/api/packages.html#exports).

## Installation

```
npm install @8by8/rewards-sdk
```

## Usage

### Client-side

```
import { RewardsClient } from '@8by8/rewards-sdk/client';
import type { GetContextualizedRewardsOpts } from '@8by8/rewards-sdk';

const rewardsClient = new RewardsClient({
  apiUrl: process.env.REWARDS_API_URL,
  apiKey: process.env.REWARDS_API_KEY // optional, use only from server-side code
});

/*
  getContextualizedRewards can accept an `opts` parameter of type
  `GetContextualizedRewardsOpts`, which can be imported from '@8by8/rewards-sdk'
  directly, along with other shared types, enums, etc.
*/
rewardsClient.getContextualizedRewards().then(rewards => {}).catch(e => {});

// Of course, the client's methods can also be awaited:
async function loadRewards(opts?: GetContextualizedRewardsOpts) {
  try {
    const rewards = await rewardsClient.getContextualizedRewards(opts);
	// do something with rewards...
  } catch(e) {
  }
}
```

The rewards client also exposes methods for retrieving reward categories
(`getAllRewardCategories`), retrieving information about one reward and the
partner offering it (`getRewardWithPartnerData`), and claiming a reward
(`claimReward`).

### Server-side

This package exports several classes that can be extended in order to implement
a NestJS server that is compatible with the client. Here is an example:

```
// rewards-guard.ts
import { Injectable } from '@nestjs/common';
import { BaseRewardsGuard } from '@8by8/rewards-sdk/server';
import { Observable } from 'rxjs';

@Injectable()
export class RewardsGuard extends BaseRewardsGuard {
  protected _canActivate(
    path: string,
    ip: string,
    apiKey?: string,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // logic for determining whether or not to allow access...
  }
}
```

```
// rewards.controller.ts
import { UseGuards } from '@nestjs/common';
import { BaseRewardsController } from '@8by8/rewards-sdk/server';
import { RewardsGuard } from './rewards-guard';
import type {
  GetContextualizedRewardsOpts,
  IContextualizedReward,
  IVoucher,
} from '@8by8/rewards-sdk';

@UseGuards(RewardsGuard)
export class RewardsController extends BaseRewardsController {
  protected _getContextualizedRewards(
    opts?: GetContextualizedRewardsOpts,
  ): Promise<IContextualizedReward[]> {
	// logic for retrieving rewards...
  }

  protected _getAllRewardCategories(): Promise<string[]> {
    // logic for retrieving reward categories...
  }

  protected __getRewardWithPartnerData(
    rewardId: string,
  ): Promise<IRewardWithPartnerData | null> {
    // logic for retrieving one reward with partner data...
  }

  protected _claimReward(rewardId: string): Promise<IVoucher[]> {
    // logic for claiming a reward...
  }
}
```
