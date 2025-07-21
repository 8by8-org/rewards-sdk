// eslint-disable-next
import type { IContextualizedReward } from '../schema/i-contextualized-reward-schema';

/**
 * A filter that can be applied when retrieving {@link IContextualizedReward}s.
 */
export enum RedemptionForumFilter {
  All = 'all',
  Online = 'online',
  InStore = 'in-store',
  Both = 'both',
}
