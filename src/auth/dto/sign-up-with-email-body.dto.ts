import { IsString, IsEmail } from 'class-validator'

export class SignUpWithEmailBody {
  @IsEmail()
  email: string

  @IsString()
  password: string
}