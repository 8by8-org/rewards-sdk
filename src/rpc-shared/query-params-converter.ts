import { z } from 'zod';
import { getContextualizedRewardsParamsSchema } from '../schema';
import type { GetContextualizedRewardsOpts } from '../model';

export class QueryParamsConverter {
  static toQueryParams(
    opts: GetContextualizedRewardsOpts,
  ): z.infer<typeof getContextualizedRewardsParamsSchema> {
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

  static toGetContextualizedRewardsOpts(
    queryParams: object,
  ): GetContextualizedRewardsOpts {
    const parsedQueryParams =
      getContextualizedRewardsParamsSchema.parse(queryParams);

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
