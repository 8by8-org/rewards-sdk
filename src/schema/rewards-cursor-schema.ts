import { z } from "zod";

export const rewardsCursorSchema = z.object({
  partnerName: z.string(),
  rewardId: z.string(),
});
