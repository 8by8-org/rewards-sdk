import { z } from 'zod';

export const IPartnerSchema = z.object({
  /**
   * A unique ID, for example "joes-famous-restaurant".
   */
  id: z.string(),
  /**
   * The partner's human-readable name.
   */
  name: z.string(),
  /**
   * The url for the partner's logo. All partner logos should be expected to
   * have a 1:1 aspect ratio.
   */
  logoUrl: z.string(),
  /**
   * A description of the partner, formatted as markdown. Optional.
   */
  description: z.string(),
  /**
   * The url of the partner's website. Optional.
   */
  website: z.string().optional(),
  /**
   * A description of why the partner supports the 8by8 cause. Formatted as
   * markdown. Optional.
   */
  why8by8: z.string().optional(),
});

/**
 * A business that has agreed to support 8by8 by offering rewards to users of
 * 8by8 applications.
 */
export type IPartner = z.infer<typeof IPartnerSchema>;
