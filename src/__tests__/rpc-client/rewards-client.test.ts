import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import qs from 'query-string';
import {
  AuthorizationHeaderConverter,
  QueryParamsConverter,
} from '../../rpc-shared';
import { RewardsClient } from '../../rpc-client';
import { API_ROUTES, RedemptionMethod } from '../../constants';
import {
  createRandomOptsObject,
  createRandomContextualizedReward,
  createRandomVoucher,
  FAKE_CATEGORIES,
  createRandomRewardWithPartnerData,
} from '../../testing';
import { mockFetch } from '../../internal';
import type { IContextualizedReward } from '../../schema';

describe('RewardsClient', () => {
  it('makes a GET request when getContextualizedRewards is called.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await rewardsClient.getContextualizedRewards();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: 'GET',
    });
  });

  it('returns an array of rewards when getContextualizedRewards successfully fetches such an array.', async () => {
    const expectedRewards: IContextualizedReward[] = [
      ...(function* () {
        for (let i = 0; i < 10; i++) {
          yield createRandomContextualizedReward();
        }
      })(),
    ];

    mockFetch({
      ok: true,
      json: () => Promise.resolve(expectedRewards),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    const actualRewards = await rewardsClient.getContextualizedRewards();
    expect(actualRewards).toEqual(expectedRewards);
  });

  it('fetches rewards with a query string that has been converted from a GetContextualizedRewardsOpts object.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const opts = createRandomOptsObject();
    const queryObject = QueryParamsConverter.toQueryParams(opts);
    const queryString = qs.stringify(queryObject);
    const apiUrl = faker.internet.url();
    const fullPath = `${apiUrl}/${API_ROUTES.getContextualizedRewards}?${queryString}`;
    const rewardsClient = new RewardsClient({ apiUrl });
    await rewardsClient.getContextualizedRewards(opts);
    expect(mock).toHaveBeenCalledWith(fullPath, expect.any(Object));
  });

  it('includes the API key in the request headers when getContextualizedRewards is called.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient({
      apiUrl: faker.internet.url(),
      apiKey,
    });
    await rewardsClient.getContextualizedRewards();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: 'GET',
      headers: AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey),
    });
  });

  it('throws an error when getContextualizedRewards is called and the response from the server is not ok.', async () => {
    mockFetch({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });
    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await expect(rewardsClient.getContextualizedRewards()).rejects.toThrow();
  });

  it('makes a GET request when getAllRewardCategories is called.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await rewardsClient.getAllRewardCategories();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: 'GET',
    });
  });

  it('returns an array of categories when getAllRewardCategories successfully fetches such an array.', async () => {
    const expectedCategories = FAKE_CATEGORIES;

    mockFetch({
      ok: true,
      json: () => Promise.resolve(FAKE_CATEGORIES),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    const actualCategories = await rewardsClient.getAllRewardCategories();
    expect(actualCategories).toEqual(expectedCategories);
  });

  it('includes the API key in the request headers when getAllRewardCategories is called.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient({
      apiUrl: faker.internet.url(),
      apiKey,
    });
    await rewardsClient.getAllRewardCategories();
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: expect.any(String),
      headers: AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey),
    });
  });

  it('throws an error when getAllRewardCategories is called and the response from the server is not ok.', async () => {
    mockFetch({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });
    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await expect(rewardsClient.getAllRewardCategories()).rejects.toThrow();
  });

  //
  it('makes a GET request when getRewardWithPartnerData is called.', async () => {
    const rewardId = faker.string.uuid();

    const mock = mockFetch({
      ok: true,
      json: () =>
        Promise.resolve(createRandomRewardWithPartnerData({ id: rewardId })),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await rewardsClient.getRewardWithPartnerData(rewardId);
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: 'GET',
    });
  });

  it('returns an IRewardWithPartnerData object when getRewardWithPartnerData successfully fetches such an object.', async () => {
    const expectedReward = createRandomRewardWithPartnerData();

    mockFetch({
      ok: true,
      json: () => Promise.resolve(expectedReward),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    const actualReward = await rewardsClient.getRewardWithPartnerData(
      expectedReward.id,
    );
    expect(actualReward).toEqual(expectedReward);
  });

  it('includes the API key in the request headers when getRewardWithPartnerData is called.', async () => {
    const rewardId = faker.string.uuid();

    const mock = mockFetch({
      ok: true,
      json: () =>
        Promise.resolve(createRandomRewardWithPartnerData({ id: rewardId })),
    });

    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient({
      apiUrl: faker.internet.url(),
      apiKey,
    });
    await rewardsClient.getRewardWithPartnerData(faker.string.uuid());
    expect(mock).toHaveBeenCalledWith(expect.any(String), {
      method: expect.any(String),
      headers: AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey),
    });
  });

  it('throws an error when getRewardWithPartnerData is called and the response from the server is not ok.', async () => {
    mockFetch({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });
    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await expect(
      rewardsClient.getRewardWithPartnerData(faker.string.uuid()),
    ).rejects.toThrow();
  });
  //

  it('makes a POST request when claimReward is called.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await rewardsClient.claimReward(faker.string.uuid());
    expect(mock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
      }),
    );
  });

  it('returns an array of vouchers when claimReward successfully fetches such an array.', async () => {
    const expectedVouchers = Object.values(RedemptionMethod).map(
      redemptionMethod => createRandomVoucher(redemptionMethod),
    );

    mockFetch({
      ok: true,
      json: () => Promise.resolve(expectedVouchers),
    });

    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    const actualVouchers = await rewardsClient.claimReward(faker.string.uuid());
    expect(actualVouchers).toEqual(expectedVouchers);
  });

  it('sends a request body that includes the rewardId to the server when claimReward is called.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const rewardId = faker.string.uuid();
    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await rewardsClient.claimReward(rewardId);
    expect(mock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        body: JSON.stringify({ rewardId }),
      }),
    );
  });

  it('includes the API key in the request headers when claimReward is called.', async () => {
    const mock = mockFetch({
      ok: true,
      json: () => Promise.resolve([]),
    });

    const apiKey = faker.string.alpha();
    const rewardsClient = new RewardsClient({
      apiUrl: faker.internet.url(),
      apiKey,
    });
    await rewardsClient.claimReward(faker.string.uuid());
    expect(mock).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        method: expect.any(String),
        headers: expect.objectContaining(
          AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey),
        ),
      }),
    );
  });

  it('throws an error when claimReward is called and the response from the server is not ok.', async () => {
    mockFetch({
      ok: false,
      status: 403,
      statusText: 'Forbidden',
    });
    const rewardsClient = new RewardsClient({ apiUrl: faker.internet.url() });
    await expect(
      rewardsClient.claimReward(faker.string.uuid()),
    ).rejects.toThrow();
  });
});
