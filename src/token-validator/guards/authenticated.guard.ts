import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from 'express'
import { Reflector } from "@nestjs/core";
import { IAccount } from "src/auth/model/IAccount";


@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    executionContext: ExecutionContext
  ) {
    const request = executionContext.switchToHttp().getRequest<Request & {user?: IAccount}>()
    const user = request.user
    return !!user
  }
}