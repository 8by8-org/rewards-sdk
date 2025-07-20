import { describe, it, expect } from "vitest";
import { faker } from "@faker-js/faker";
import qs from "query-string";
import {
  AuthorizationHeaderConverter,
  QueryParamsConverter,
  RewardsClient,
} from "../../rpc";
import {
  createRandomOptsObject,
  createRandomReward,
  createRandomVoucher,
  fakeCategories,
  mockFetch,
} from "../../util/testing";
import { API_ROUTES } from "../../constants";
import { RedemptionMethod, type IContextualizedReward } from "../../model";

describe("RewardsClient", () => {
  it("makes a GET request when getRewards is called.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardsClient = new RewardsClient(faker.internet.url());
    await rewardsClient.getRewards();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: "GET",
    });
  });

  it("returns an array of rewards when getRewards successfully fetches such an array.", async () => {
    const expectedRewards: IContextualizedReward[] = [
      ...(function* () {
        for (let i = 0; i < 10; i++) {
          yield createRandomReward();
        }
      })(),
    ];

    mockFetch({
      ok: true,
      json: () => Promise.resolve(expectedRewards),
    });

    const rewardsClient = new RewardsClient(faker.internet.url());
    const actualRewards = await rewardsClient.getRewards();
    expect(actualRewards).toEqual(expectedRewards);
  });

  it("fetches rewards with a query string that has been converted from a GetRewardsOpts object.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const opts = createRandomOptsObject();
    const queryObject = QueryParamsConverter.toQueryParams(opts);
    const queryString = qs.stringify(queryObject);
    const apiUrl = faker.internet.url();
    const fullPath = `${apiUrl}/${API_ROUTES.getRewards}?${queryString}`;
    const rewardsClient = new RewardsClient(apiUrl);
    await rewardsClient.getRewards(opts);
    expect(mock).toHaveBeenCalledWith(fullPath, expect.any(Object));
  });

  it("includes the API key in the request headers when getRewards is called.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient(faker.internet.url(), apiKey);
    await rewardsClient.getRewards();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: "GET",
      headers: AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey),
    });
  });

  it("throws an error when getRewards is called and the response from the server is not ok.", async () => {
    mockFetch({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    });
    const rewardsClient = new RewardsClient(faker.internet.url());
    await expect(rewardsClient.getRewards()).rejects.toThrow();
  });

  it("makes a GET request when getAllRewardCategories is called.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardsClient = new RewardsClient(faker.internet.url());
    await rewardsClient.getAllRewardCategories();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: "GET",
    });
  });

  it("returns an array of categories when getAllRewardCategories successfully fetches such an array.", async () => {
    const expectedCategories = fakeCategories;

    mockFetch({
      ok: true,
      json: () => Promise.resolve(fakeCategories),
    });

    const rewardsClient = new RewardsClient(faker.internet.url());
    const actualCategories = await rewardsClient.getAllRewardCategories();
    expect(actualCategories).toEqual(expectedCategories);
  });

  it("includes the API key in the request headers when getAllRewardCategories is called.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient(faker.internet.url(), apiKey);
    await rewardsClient.getAllRewardCategories();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: expect.any(String),
      headers: AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey),
    });
  });

  it("throws an error when getAllRewardCategories is called and the response from the server is not ok.", async () => {
    mockFetch({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    });
    const rewardsClient = new RewardsClient(faker.internet.url());
    await expect(rewardsClient.getAllRewardCategories()).rejects.toThrow();
  });

  it("makes a POST request when claimReward is called.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardsClient = new RewardsClient(faker.internet.url());
    await rewardsClient.claimReward(faker.string.uuid());
    expect(mock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
      })
    );
  });

  it("returns an array of vouchers when claimReward successfully fetches such an array.", async () => {
    const expectedVouchers = Object.values(RedemptionMethod).map(
      (redemptionMethod) => createRandomVoucher(redemptionMethod)
    );

    mockFetch({
      ok: true,
      json: () => Promise.resolve(expectedVouchers),
    });

    const rewardsClient = new RewardsClient(faker.internet.url());
    const actualVouchers = await rewardsClient.claimReward(faker.string.uuid());
    expect(actualVouchers).toEqual(expectedVouchers);
  });

  it("sends a request body that includes the rewardId to the server when claimReward is called.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardId = faker.string.uuid();
    const rewardsClient = new RewardsClient(faker.internet.url());
    await rewardsClient.claimReward(rewardId);
    expect(mock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ rewardId }),
      })
    );
  });

  it("includes the API key in the request headers when claimReward is called.", async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient(faker.internet.url(), apiKey);
    await rewardsClient.claimReward(faker.string.uuid());
    expect(mock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: expect.any(String),
        headers: expect.objectContaining(
          AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey)
        ),
      })
    );
  });

  it("throws an error when claimReward is called and the response from the server is not ok.", async () => {
    mockFetch({
      ok: false,
      status: 403,
      statusText: "Forbidden",
    });
    const rewardsClient = new RewardsClient(faker.internet.url());
    await expect(
      rewardsClient.claimReward(faker.string.uuid())
    ).rejects.toThrow();
  });
});
