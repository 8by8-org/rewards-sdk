import type { RedemptionForum } from './redemption-forum';

export interface IRewardWithPartnerData {
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
}
