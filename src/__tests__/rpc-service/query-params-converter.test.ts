import { describe, it, expect } from "vitest";
import { QueryParamsConverter } from "../../rpc";
import { getRewardsParamsSchema } from "../../schema";
import { getRewardsOptsSchema } from "../../schema";
import {
  createRandomOptsObject,
  createRandomQueryParamsObject,
} from "../../util/testing";

describe("QueryParamsConverter", () => {
  it("converts a GetRewardsOpts object into a query params object.", () => {
    const opts = createRandomOptsObject();
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
    const queryParams = createRandomQueryParamsObject();
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
