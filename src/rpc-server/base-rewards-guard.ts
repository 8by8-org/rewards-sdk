import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthorizationHeaderConverter } from '../rpc-shared/authorization-header-converter';

interface ExpressRequest {
  headers: Record<string, string>;
  path: string;
  ip: string;
}

interface FastifyRequest {
  headers: Record<string, string>;
  routeOptions: {
    url: string;
  };
  ip: string;
}

interface RequestInformation {
  path: string;
  headers: Record<string, string>;
  ip: string;
}

@Injectable()
export abstract class BaseRewardsGuard implements CanActivate {
  protected abstract _canActivate(
    path: string,
    ip: string,
    apiKey?: string,
  ): boolean | Promise<boolean> | Observable<boolean>;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const { path, headers, ip } = this.extractRequestInformation(request);
    const apiKey = this.getAPIKeyFromHeaders(headers);
    return this._canActivate(path, ip, apiKey);
  }

  protected getAPIKeyFromHeaders(headers: Record<string, string>) {
    return AuthorizationHeaderConverter.toAPIKeyFromHeaders(headers);
  }

  protected extractRequestInformation(request: unknown): RequestInformation {
    if (this.isExpressRequest(request)) {
      return {
        path: request.path,
        headers: request.headers,
        ip: request.ip,
      };
    }

    if (this.isFastifyRequest(request)) {
      return {
        path: request.routeOptions.url,
        headers: request.headers,
        ip: request.ip,
      };
    } /* v8 ignore start */

    throw new Error(
      'Received request was neither an Express request nor a Fastify request. ' +
        'If you are using a custom platform, consider overriding the ' +
        'getPathAndHeadersFromRequest method of the BaseRewardsGuard.',
    );
    /* v8 ignore stop */
  }

  protected isExpressRequest(request: unknown): request is ExpressRequest {
    return (
      typeof request === 'object' &&
      request !== null &&
      'headers' in request &&
      this.isRecord(request.headers) &&
      'path' in request &&
      typeof request.path === 'string' &&
      'ip' in request &&
      typeof request.ip === 'string'
    );
  }

  protected isFastifyRequest(request: unknown): request is FastifyRequest {
    return (
      typeof request === 'object' &&
      request !== null &&
      'headers' in request &&
      this.isRecord(request.headers) &&
      'routeOptions' in request &&
      typeof request.routeOptions === 'object' &&
      request.routeOptions !== null &&
      'url' in request.routeOptions &&
      typeof request.routeOptions.url === 'string' &&
      'ip' in request &&
      typeof request.ip === 'string'
    );
  }

  protected isRecord(thing: unknown): thing is Record<string, string> {
    return (
      typeof thing === 'object' &&
      thing !== null &&
      Object.entries(thing).every(([key, value]) => {
        return typeof key === 'string' && typeof value === 'string';
      })
    );
  }
}
