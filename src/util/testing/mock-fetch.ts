import { vi } from "vitest";

interface MockFetchOpts {
  ok?: boolean;
  status?: number;
  statusText?: string;
  json?: () => Promise<object | unknown[]>;
}

export function mockFetch(opts: MockFetchOpts) {
  const mock = vi.fn(() => {
    return Promise.resolve(opts as unknown as Response);
  });
  global.fetch = mock;
  return mock;
}
