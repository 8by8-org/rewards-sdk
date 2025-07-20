import { describe, it, expect } from "vitest";
import { createRandomQueryParamsObject } from "../../util/testing";
import { GetRewardsOptsPipe } from "../../rpc";
import { getRewardsOptsSchema } from "../../schema";

describe("GetRewardOptsPipe", () => {
  it("transforms a query params object into a GetRewardOpts object.", () => {
    const queryParams = createRandomQueryParamsObject();
    const pipe = new GetRewardsOptsPipe();
    const transformed = pipe.transform(queryParams);
    expect(getRewardsOptsSchema.safeParse(transformed).success).toBe(true);
  });
});
