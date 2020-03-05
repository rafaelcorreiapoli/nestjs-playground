import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_CONSTANTS } from '../loft-jwt/constants/JWT_CONSTANTS';
import { User } from '../users/model/user.entity';

type UserToBeEncoded = Pick<User, 'email' | 'id' | 'roles'>
@Injectable()
export class TokenEncoderService {
  
  constructor(
    private readonly jwtService: JwtService  
  ) {}

  private encodeAccessTokenForUser(user: UserToBeEncoded): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: user.roles,
    }, {
      expiresIn: JWT_CONSTANTS.expiresIn.access,
      issuer: JWT_CONSTANTS.issuer
    })
  }
  private encodeRefreshTokenForUser(user: UserToBeEncoded): string {
    return this.jwtService.sign({
      id: user.id,
      email: user.email,
      roles: ['refresh-token'],
    }, {
      expiresIn: JWT_CONSTANTS.expiresIn.refresh,
      issuer: JWT_CONSTANTS.issuer
    })
  }

  encodeTokenPair(user: UserToBeEncoded) {
    return {
      accessToken: this.encodeAccessTokenForUser(user),
      refreshToken: this.encodeRefreshTokenForUser(user)
    }
  }
}
