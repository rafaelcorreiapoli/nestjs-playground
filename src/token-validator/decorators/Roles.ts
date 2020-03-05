import { SetMetadata } from "@nestjs/common";
import { ROLES_TOKEN } from "../constants/ROLES_TOKEN";

export const Roles = (...roles: string[]) => SetMetadata(ROLES_TOKEN, roles)