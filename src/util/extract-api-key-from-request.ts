export function extractAPIKeyFromRequest(request: Request): string | null {
  const authorizationHeaderValue = request.headers["authorization"];
  if (authorizationHeaderValue) {
    const parts = authorizationHeaderValue.split(" ");
    if (parts.length === 2 && parts[0] === "Bearer") {
      return parts[1];
    }
  }

  return null;
}
