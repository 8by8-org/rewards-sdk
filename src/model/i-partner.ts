/**
 * A business that has agreed to support 8by8 by offering rewards to users of
 * 8by8 applications.
 */
export interface IPartner {
  /**
   * A unique ID, for example "joes-famous-restaurant".
   */
  id: string;
  /**
   * The partner's human-readable name.
   */
  name: string;
  /**
   * A description of the partner, formatted as markdown. Optional.
   */
  description: string;
  /**
   * The url of the partner's website. Optional.
   */
  website?: string;
  /**
   * A description of why the partner supports the 8by8 cause. Formatted as
   * markdown. Optional.
   */
  why8by8?: string;
}
