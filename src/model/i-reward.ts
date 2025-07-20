import type { RedemptionForum } from './redemption-forum';

export interface IReward {
  id: string;
  partnerId: string;
  shortDescription: string;
  redemptionForums: RedemptionForum[];
  categories: string[];
  longDescription?: string;
  expirationDate?: Date;
}
