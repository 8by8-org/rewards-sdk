# Rewards SDK

This is the software development kit for implementing the 8by8 Rewards System.

The package provides shared types, a client stub for the rewards system RPC, a
[NestJS](https://nestjs.com/) controller than can be derived from to implement the server, and more.

## Project Requirements

In the `tsconfig.json` file for your project, ensure that `moduleResolution` is
set to `node16`, `nodenext`, or `bundler` for compatibility with
[submodule exports](https://nodejs.org/api/packages.html#exports). Submodule
exports are employed so that client-side code does not need to include
NestJS packages as dependencies.

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
  IRewardWithPartnerData,
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

  protected _getRewardWithPartnerData(
    rewardId: string,
  ): Promise<IRewardWithPartnerData | null> {
    // logic for retrieving one reward with partner data...
  }

  protected _claimReward(rewardId: string): Promise<IVoucher[]> {
    // logic for claiming a reward...
  }
}
```

## Other Exports

The sdk exports other members that developers might find useful, such as the
`API_ROUTES` constant (useful for implementing guards) and
[Zod](https://zod.dev/) validators for many exported interfaces:

```
import { API_ROUTES, IContextualizedRewardSchema } from '@8by8/rewards-sdk';
```

Functions for creating random instances of exported interfaces are available
through the testing module, like so:

```
import {
  createRandomContextualizedReward,
  FAKE_CATEGORIES
} from '@8by8/rewards-sdk/testing';
```

These can be useful for developing frontend components that expect instances of
these interfaces as props, creating mock instances of these interfaces for
testing, and more. Most of these functions accept an optional object of type
`Partial<T>` where `T` is the interface they return, allowing the developer to
replace select properties of the returned object with values of their choosing,
while randomizing the rest. Notable exceptions to this are
`createRandomVoucher`, which instead accepts a `RedemptionMethod` (this will be
randomized if not provided), and `createRandomPoint` which accepts no arguments.

Note that to use this submodule, `@faker-js/faker` must be installed.

## Terminology

- partner - A business that has agreed to support the 8by8 cause by offering a
  reward or rewards through the 8by8 rewards system.
- reward - A reward that can be claimed through the 8by8 rewards system, via a
  user-facing 8by8 application.
- claim - The act of selecting a reward through an 8by8 application.
- voucher - Data available to the user once they have claimed a reward. The user
  can provide this data to the corresponding partner in order to redeem the
  claimed reward.
- redeem - The act of providing voucher data to the corresponding partner and
  receiving the benefits of the corresponding reward.
- redemption forum - A property of a reward that indicates where the user can
  expect to redeem the reward, i.e. online or in-store.
- redemption method - A property of a voucher that indicates how the user must
  provide the voucher to the partner in order to redeem the corresponding reward.
