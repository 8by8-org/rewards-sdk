import { z } from 'zod';
import { RedemptionForum } from '../model';
import { maybeDate } from './maybe-date';
import { pointSchema } from './point-schema';

export const contextualizedRewardSchema = z.object({
  id: z.string(),
  partnerId: z.string(),
  shortDescription: z.string(),
  redemptionForums: z.enum(RedemptionForum).array(),
  categories: z.string().array(),
  longDescription: z.string().optional(),
  expirationDate: maybeDate,
  partnerName: z.string(),
  partnerDescription: z.string(),
  partnerWebsite: z.string().optional(),
  partnerWhy8by8: z.string().optional(),
  nearestLocationCoordinates: pointSchema.optional(),
  distanceToNearestLocation: z.number().optional(),
});
