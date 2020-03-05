import { UseGuards } from "@nestjs/common";
import { AuthenticatedGuard } from "../guards/authenticated.guard";

export const Authenthicated = () => UseGuards(AuthenticatedGuard)