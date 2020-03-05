import { Module, Global } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

@Global()
@Module({
  providers: [],
  exports: [JwtModule],
  imports: [
    JwtModule.register({
      secret: 'secret'
    })
  ],
})
export class LoftJwtModule {}