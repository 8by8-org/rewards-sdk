import { z } from 'zod';
import { RedemptionForumFilter, SortOrder } from '../model';
import { pointSchema } from './point-schema';
import { rewardsCursorSchema } from './rewards-cursor-schema';

export const getContextualizedRewardsOptsSchema = z.object({
  redemptionForumFilter: z.enum(RedemptionForumFilter).optional(),
  sortOrder: z.enum(SortOrder).optional(),
  userLocation: pointSchema.optional(),
  cursor: rewardsCursorSchema.optional(),
  categories: z.string().array().optional(),
  maxDistance: z.number().optional(),
  ignoreMaxDistanceForOnlineRewards: z.boolean().optional(),
  maxNumResults: z.number().optional(),
});
