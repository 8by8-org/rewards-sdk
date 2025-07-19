import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";
import { AuthorizationHeaderConverter } from "./authorization-header-converter";

@Injectable()
export abstract class BaseAuthGuard implements CanActivate {
  abstract canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean>;

  protected getAPIKeyFromHeaders(headers: Record<string, string>) {
    return AuthorizationHeaderConverter.toAPIKeyFromHeaders(headers);
  }
}
