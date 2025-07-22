import {
  GetContextualizedRewardsQueryParamsSchema,
  type GetContextualizedRewardsQueryParams,
  type GetContextualizedRewardsOpts,
} from '../schema';

/**
 * A static class that can convert {@link GetContextualizedRewardsOpts} to
 * {@link GetContextualizedRewardsQueryParams}, and vice-versa.
 */
export class QueryParamsConverter {
  /**
   * Converts {@link GetContextualizedRewardsOpts} to
   * {@link GetContextualizedRewardsQueryParams}. Primarily for client-side use.
   *
   * @param opts - The options object to convert.
   * @returns A {@link GetContextualizedRewardsQueryParams} object.
   */
  static toQueryParams(
    opts: GetContextualizedRewardsOpts,
  ): GetContextualizedRewardsQueryParams {
    const queryParams = {
      redemptionForumFilter: opts.redemptionForumFilter,
      sortOrder: opts.sortOrder,
      userLatitude: opts.userCoordinates?.latitude,
      userLongitude: opts.userCoordinates?.longitude,
      partnerNameCursor: opts.cursor?.partnerName,
      rewardIdCursor: opts.cursor?.rewardId,
      maxDistance: opts.maxDistance,
      categories: opts.categories,
      ignoreMaxDistanceForOnlineRewards: opts.ignoreMaxDistanceForOnlineRewards,
      maxNumResults: opts.maxNumResults,
    };

    return queryParams;
  }

  /**
   * Converts {@link GetContextualizedRewardsQueryParams} to
   * {@link GetContextualizedRewardsOpts}. Primarily for server-side use.
   *
   * @param queryParams - The query params object to convert.
   * @returns A {@link GetContextualizedRewardsOpts} object.
   */
  static toGetContextualizedRewardsOpts(
    queryParams: object,
  ): GetContextualizedRewardsOpts {
    const parsedQueryParams =
      GetContextualizedRewardsQueryParamsSchema.parse(queryParams);

    const opts: GetContextualizedRewardsOpts = {
      redemptionForumFilter: parsedQueryParams.redemptionForumFilter,
      sortOrder: parsedQueryParams.sortOrder,
      userCoordinates:
        parsedQueryParams.userLatitude && parsedQueryParams.userLongitude ?
          {
            latitude: parsedQueryParams.userLatitude,
            longitude: parsedQueryParams.userLongitude,
          }
        : undefined,
      cursor:
        (
          parsedQueryParams.partnerNameCursor &&
          parsedQueryParams.rewardIdCursor
        ) ?
          {
            partnerName: parsedQueryParams.partnerNameCursor,
            rewardId: parsedQueryParams.rewardIdCursor,
          }
        : undefined,
      maxDistance: parsedQueryParams.maxDistance,
      categories: parsedQueryParams.categories,
      ignoreMaxDistanceForOnlineRewards:
        parsedQueryParams.ignoreMaxDistanceForOnlineRewards,
      maxNumResults: parsedQueryParams.maxNumResults,
    };

    return opts;
  }
}
