import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenEncoderService } from '../token-encoder/token-encoder.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    UsersModule,
  ],
  providers: [AuthService, TokenEncoderService],
  controllers: [AuthController],
  
})
export class AuthModule {}
