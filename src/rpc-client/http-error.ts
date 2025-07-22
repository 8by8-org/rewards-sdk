// eslint-disable-next-line
import type { RewardsClient } from './rewards-client';

/**
 * An error thrown by the {@link RewardsClient} when a request made by one of
 * its methods returns with a response that is not ok.
 */
export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}
