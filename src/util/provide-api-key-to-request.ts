export function provideAPIKeyToRequest(
  apiKey: string,
  requestParams: RequestInit
) {
  return {
    ...requestParams,
    headers: {
      ...requestParams.headers,
      authorization: `Bearer ${apiKey}`,
    },
  };
}
