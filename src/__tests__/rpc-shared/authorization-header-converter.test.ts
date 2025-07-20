import { describe, it, expect } from 'vitest';
import { faker } from '@faker-js/faker';
import { AuthorizationHeaderConverter } from '../../rpc-shared';

describe('AuthorizationHeaderConverter', () => {
  it('sets the value of the authorization header to the API key using the bearer scheme.', () => {
    const apiKey = faker.string.alpha();
    const headers = AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey);
    expect(headers).toStrictEqual({
      [AuthorizationHeaderConverter.AUTH_HEADER]: `${AuthorizationHeaderConverter.AUTH_SCHEME} ${apiKey}`,
    });
  });

  it('reads the API key from headers.', () => {
    const apiKey = faker.string.alpha();
    const headers = AuthorizationHeaderConverter.toHeaderFromAPIKey(apiKey);
    expect(AuthorizationHeaderConverter.toAPIKeyFromHeaders(headers)).toBe(
      apiKey,
    );
  });
});
