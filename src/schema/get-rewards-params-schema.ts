import { z } from "zod";
import { RedemptionForumFilter, SortOrder } from "../model";
import { pointSchema } from "./point-schema";
import { rewardsCursorSchema } from "./rewards-cursor-schema";

export const getRewardsParamsSchema = z.object({
  redemptionForumFilter: z.enum(RedemptionForumFilter).optional(),
  sortOrder: z.enum(SortOrder).optional(),
  userCoordinates: pointSchema.optional(),
  cursor: rewardsCursorSchema.optional(),
  maxDistance: z.number().optional(),
  categories: z.string().array().optional(),
  ignoreMaxDistanceForOnlineRewards: z.boolean().optional(),
  maxNumResults: z.number().optional(),
});
