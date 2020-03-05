import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { SignInWithEmailBody } from './dto/sign-in-with-email-body.dto';
import { AuthService } from './auth.service';
import { SignUpWithEmailBody } from './dto/sign-up-with-email-body.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {

  }

  @Post('/signin/email')
  async signInWithEmail(@Body() body: SignInWithEmailBody) {
    return this.authService.signInWithEmail(body.email, body.password)
  }

  @Post('/signup/email')
  @HttpCode(HttpStatus.CREATED)
  async signUpWithEmail(@Body() body: SignUpWithEmailBody) {
    return this.authService.signUpWithEmail(body.email, body.password)
  }
}
