import { z } from "zod";
import { RedemptionForumFilter, SortOrder } from "../model";
import { pointSchema } from "./point-schema";
import { rewardsCursorSchema } from "./rewards-cursor-schema";

export const getRewardsParamsSchema = z.object({
  redemptionForumFilter: z.enum(RedemptionForumFilter).optional(),
  sortOrder: z.enum(SortOrder).optional(),
  userCoordinates: pointSchema
    .or(z.string())
    .optional()
    .transform((v) =>
      typeof v === "string" ? pointSchema.parse(JSON.parse(v)) : v
    ),
  cursor: rewardsCursorSchema
    .or(z.string())
    .optional()
    .transform((v) =>
      typeof v === "string" ? rewardsCursorSchema.parse(JSON.parse(v)) : v
    ),
  maxDistance: z.number().optional(),
  categories: z.string().array().optional(),
  ignoreMaxDistanceForOnlineRewards: z.boolean().optional(),
  maxNumResults: z.number().optional(),
});
