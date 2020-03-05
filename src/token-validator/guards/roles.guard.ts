import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from 'express'
import { Reflector } from "@nestjs/core";
import { IAccount } from "src/auth/model/IAccount";
import { intersection } from "src/common/utils/intersection";
import { ROLES_TOKEN } from "../constants/ROLES_TOKEN";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  
  canActivate(
    executionContext: ExecutionContext
  ) {
    const roles = this.reflector.get<string[]>(ROLES_TOKEN, executionContext.getHandler());
    if (!roles) {
      return true;
    }

    const request = executionContext.switchToHttp().getRequest<Request & {user: IAccount}>()
    const user = request.user
    if (!user) {
      return false
    }

    return intersection(roles, user.roles).length > 0
  }
}