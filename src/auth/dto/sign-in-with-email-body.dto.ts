import { IsString, IsEmail } from 'class-validator'

export class SignInWithEmailBody {
  @IsEmail()
  email: string

  @IsString()
  password: string
}