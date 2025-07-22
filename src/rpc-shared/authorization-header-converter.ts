/**
 * A static class that, given an API key, can create a headers object with the
 * authorization header set, and given a headers object, can read the API key
 * from that object.
 */
export class AuthorizationHeaderConverter {
  static readonly AUTH_HEADER = 'authorization';
  static readonly AUTH_SCHEME = 'Bearer';

  /**
   * Creates a headers object that includes the provided API key in the
   * authorization header. Primarily for client-side use.
   *
   * @param apiKey - The API key to provide to the authorization header.
   * @returns A headers object.
   */
  static toHeaderFromAPIKey(apiKey: string): Record<string, string> {
    return {
      [this.AUTH_HEADER]: `${this.AUTH_SCHEME} ${apiKey}`,
    };
  }

  /**
   * Reads an API key, if present, from a headers object. Primarily for
   * server-side use.
   *
   * @param headers - The headers to query for the API key.
   * @returns An API key, if one was found.
   */
  static toAPIKeyFromHeaders(
    headers: Record<string, string>,
  ): string | undefined {
    if (this.AUTH_HEADER in headers) {
      const [schema, apiKey] = headers[this.AUTH_HEADER].split(' ');
      if (schema === this.AUTH_SCHEME && apiKey) {
        return apiKey;
      }
    }
  }
}
