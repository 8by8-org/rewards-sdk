import type { RedemptionForum } from "./redemption-forum";
import type { IPoint } from "./i-point";

export interface IContextualizedReward {
  id: string;
  partnerId: string;
  shortDescription: string;
  redemptionForums: RedemptionForum[];
  categories: string[];
  longDescription?: string;
  expirationDate?: Date;
  partnerName: string;
  partnerDescription: string;
  partnerWebsite?: string;
  partnerWhy8by8?: string;
  nearestLocationCoordinates?: IPoint;
  distanceToNearestLocation?: number;
}
