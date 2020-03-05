import { Injectable, NestMiddleware, Logger } from "@nestjs/common";
import { Request } from 'express'
import { JwtService } from "@nestjs/jwt";
import { TokenValidatorService } from "../token-validator.service";

const extractJwtFromRequest = (req: Request) => {
  const authorization = req.headers.authorization
  if (!authorization) {
    return null
  }
  const [_, token] = authorization.split(' ')
  if (!token) {
    return null
  }

  return token
}

@Injectable()
export class UserFromJwt implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenValidatorService: TokenValidatorService,
    private readonly logger: Logger
  ) {}

  use(req: Request, res: Response, next: Function) {
    const jwt = extractJwtFromRequest(req)
    if (!jwt) {
      return next()
    }

    try {
      const user = this.tokenValidatorService.validate(jwt)
      req.user = user
    } catch (err) {
      this.logger.debug(`Failed to verify jwt`)
      this.logger.debug(err)
      
    } finally {
      next()
    }
  }
}
