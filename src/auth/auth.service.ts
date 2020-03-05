import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt'
import { UsersService } from '../users/users.service';
import { TokenEncoderService } from '../token-encoder/token-encoder.service';
import { User } from '../users/model/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tokenEncoderService: TokenEncoderService
  ) {}

  private cleanupUserPassword = (user: User): Omit<User, 'password'> => {
    const {
      password,
      ...userWithoutPassword
    } = user
  
    return userWithoutPassword
  }

  private isPasswordCorrect(rawPassword: string, hashedPassword: string): Promise<boolean> {
    return compare(rawPassword, hashedPassword)
  }

  private async validateUserEmailAndPassword(email: string, rawPassword: string) {
    const user =  await this.usersService.findByEmail(email)
    if (!user) {
      return null
    }
    const correctPassword = this.isPasswordCorrect(rawPassword, user.password)
    
    if (!correctPassword) {
      return null
    }

    return user
  }

  private prepareUserAndTokens(user: User) {
    const { accessToken, refreshToken } = this.tokenEncoderService.encodeTokenPair(user)

    return {
      accessToken,
      refreshToken,
      user: this.cleanupUserPassword(user)
    }
  }

  async signInWithEmail(email: string, rawPassword: string) {
    const user = await this.validateUserEmailAndPassword(email, rawPassword)
    if (!user) {
      throw new UnauthorizedException()
    }
    
    return this.prepareUserAndTokens(user) 
  }

  async signUpWithEmail(email: string, rawPassword: string) {
    const user = await this.usersService.createUser(email, rawPassword)
    return this.prepareUserAndTokens(user)
  }
}
