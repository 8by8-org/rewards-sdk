import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthorizationHeaderConverter } from "./authorization-header-converter";

interface ExpressRequest {
  headers: Record<string, string>;
  path: string;
}

interface FastifyRequest {
  headers: Record<string, string>;
  routeOptions: {
    url: string;
  };
}

export interface PathAndHeaders {
  path: string;
  headers: Record<string, string>;
}

@Injectable()
export abstract class BaseRewardsGuard implements CanActivate {
  protected abstract _canActivate(
    path: string,
    apiKey?: string
  ): boolean | Promise<boolean> | Observable<boolean>;

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const { path, headers } = this.getPathAndHeadersFromRequest(request);
    const apiKey = this.getAPIKeyFromHeaders(headers);
    return this._canActivate(path, apiKey);
  }

  protected getAPIKeyFromHeaders(headers: Record<string, string>) {
    return AuthorizationHeaderConverter.toAPIKeyFromHeaders(headers);
  }

  protected getPathAndHeadersFromRequest(request: unknown): PathAndHeaders {
    if (this.isExpressRequest(request)) {
      return {
        path: request.path,
        headers: request.headers,
      };
    }

    if (this.isFastifyRequest(request)) {
      return {
        path: request.routeOptions.url,
        headers: request.headers,
      };
    }

    throw new Error(
      "Received request was neither an Express request nor a Fastify request. " +
        "If you are using a custom platform, consider overriding the " +
        "getPathAndHeadersFromRequest method of the BaseRewardsGuard."
    );
  }

  protected isExpressRequest(request: unknown): request is ExpressRequest {
    return (
      typeof request === "object" &&
      request !== null &&
      "headers" in request &&
      this.isRecord(request.headers) &&
      "path" in request &&
      typeof request.path === "string"
    );
  }

  protected isFastifyRequest(request: unknown): request is FastifyRequest {
    return (
      typeof request === "object" &&
      request !== null &&
      "headers" in request &&
      this.isRecord(request.headers) &&
      "routeOptions" in request &&
      typeof request.routeOptions === "object" &&
      request.routeOptions !== null &&
      "url" in request.routeOptions &&
      typeof request.routeOptions.url === "string"
    );
  }

  protected isRecord(thing: unknown): thing is Record<string, string> {
    return (
      typeof thing === "object" &&
      thing !== null &&
      Object.entries(thing).every(([key, value]) => {
        return typeof key === "string" && typeof value === "string";
      })
    );
  }
}
