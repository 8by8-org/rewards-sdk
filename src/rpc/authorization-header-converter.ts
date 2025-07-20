export class AuthorizationHeaderConverter {
  static readonly AUTH_HEADER = "authorization";
  static readonly AUTH_SCHEME = "Bearer";

  static toHeaderFromAPIKey(apiKey: string): Record<string, string> {
    return {
      [this.AUTH_HEADER]: `${this.AUTH_SCHEME} ${apiKey}`,
    };
  }

  static toAPIKeyFromHeaders(
    headers: Record<string, string>
  ): string | undefined {
    if (this.AUTH_HEADER in headers) {
      const [schema, apiKey] = headers[this.AUTH_HEADER].split(" ");
      if (schema === this.AUTH_SCHEME && apiKey) {
        return apiKey;
      }
    }
  }
}
