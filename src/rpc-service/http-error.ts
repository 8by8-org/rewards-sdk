export class HTTPError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly statusText: string
  ) {
    super(message);
  }
}
