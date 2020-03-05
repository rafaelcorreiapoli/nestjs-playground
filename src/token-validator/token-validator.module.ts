import { Module } from '@nestjs/common';
import { LoftJwtModule } from 'src/loft-jwt/loft-jwt.module';
import { TokenValidatorService } from './token-validator.service';

@Module({
  imports: [
    LoftJwtModule,
  ],
  providers: [TokenValidatorService],
  exports: [TokenValidatorService]
})
export class TokenValidatorModule {}
