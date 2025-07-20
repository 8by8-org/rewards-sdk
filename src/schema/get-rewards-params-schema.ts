import { z } from 'zod';
import { RedemptionForumFilter, SortOrder } from '../model';

export const getRewardsParamsSchema = z.object({
  redemptionForumFilter: z.enum(RedemptionForumFilter).optional(),
  sortOrder: z.enum(SortOrder).optional(),
  userLatitude: z.coerce.number().optional(),
  userLongitude: z.coerce.number().optional(),
  partnerNameCursor: z.string().optional(),
  rewardIdCursor: z.string().optional(),
  categories: z.string().array().optional(),
  maxDistance: z.coerce.number().optional(),
  ignoreMaxDistanceForOnlineRewards: z.coerce.boolean().optional(),
  maxNumResults: z.coerce.number().optional(),
});
