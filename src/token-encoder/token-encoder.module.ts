import { Module } from '@nestjs/common';
import { TokenEncoderService } from '../token-encoder/token-encoder.service';
import { LoftJwtModule } from 'src/loft-jwt/loft-jwt.module';

@Module({
  imports: [
    LoftJwtModule,
  ],
  providers: [TokenEncoderService],
  exports: [TokenEncoderService]
})
export class TokenEncoderModule {}
