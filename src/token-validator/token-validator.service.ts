import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IAccount } from 'src/auth/model/IAccount';
import { JWT_CONSTANTS } from 'src/loft-jwt/constants/JWT_CONSTANTS';

@Injectable()
export class TokenValidatorService {
  
  constructor(
    private readonly jwtService: JwtService  
  ) {}

  public validate(token: string): IAccount {
    return this.jwtService.verify(token, {
      issuer: JWT_CONSTANTS.issuer,
    })
  }
}
