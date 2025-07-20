import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import { z } from "zod";
import { QueryParamsConverter } from "../../rpc-service";
import { getRewardsParamsSchema } from "../../schema";
import { getRewardsOptsSchema } from "../../schema";
import {
  RedemptionForumFilter,
  SortOrder,
  type GetRewardsOpts,
} from "../../model";

describe("QueryParamsConverter", () => {
  it("converts a GetRewardsOpts object into a query params object.", () => {
    const opts: GetRewardsOpts = {
      redemptionForumFilter: RedemptionForumFilter.All,
      sortOrder: SortOrder.AtoZ,
      userCoordinates: {
        latitude: faker.location.latitude(),
        longitude: faker.location.longitude(),
      },
      cursor: {
        partnerName: faker.company.name(),
        rewardId: faker.string.uuid(),
      },
      categories: ["Food & Drink", "Arts & Entertainment", "Sports & Camping"],
      maxDistance: 2000,
      ignoreMaxDistanceForOnlineRewards: true,
      maxNumResults: 10,
    };

    const converted = QueryParamsConverter.toQueryParams(opts);

    expect(getRewardsParamsSchema.safeParse(converted).success).toBe(true);

    for (const [key, value] of Object.entries(converted)) {
      if (
        [
          "userLatitude",
          "userLongitude",
          "partnerNameCursor",
          "rewardIdCursor",
        ].includes(key)
      ) {
        continue;
      }

      // toEqual is used here to be able to check categories
      expect(opts[key]).toEqual(value);
    }

    expect(converted.userLatitude).toBe(opts.userCoordinates?.latitude);
    expect(converted.userLongitude).toBe(opts.userCoordinates?.longitude);
    expect(converted.partnerNameCursor).toBe(opts.cursor?.partnerName);
    expect(converted.rewardIdCursor).toBe(opts.cursor?.rewardId);
  });

  it("converts a query params object into a GetRewardsOpts object.", () => {
    const queryParams: z.infer<typeof getRewardsParamsSchema> = {
      redemptionForumFilter: RedemptionForumFilter.All,
      sortOrder: SortOrder.ZtoA,
      userLatitude: faker.location.latitude(),
      userLongitude: faker.location.longitude(),
      partnerNameCursor: faker.company.name(),
      rewardIdCursor: faker.string.uuid(),
      categories: ["Clothing & Jewelry", "Technology/Gaming"],
      maxDistance: 5000,
      ignoreMaxDistanceForOnlineRewards: false,
      maxNumResults: 20,
    };

    const converted = QueryParamsConverter.toGetRewardsOpts(queryParams);

    expect(getRewardsOptsSchema.safeParse(converted).success).toBe(true);

    for (const [key, value] of Object.entries(converted)) {
      if (["userCoordinates", "cursor"].includes(key)) {
        continue;
      }

      // toEqual is used here to be able to check categories
      expect(queryParams[key]).toEqual(value);
    }

    expect(converted.userCoordinates?.latitude).toBe(queryParams.userLatitude);
    expect(converted.userCoordinates?.longitude).toBe(
      queryParams.userLongitude
    );
    expect(converted.cursor?.partnerName).toBe(queryParams.partnerNameCursor);
    expect(converted.cursor?.rewardId).toBe(queryParams.rewardIdCursor);
  });
});
