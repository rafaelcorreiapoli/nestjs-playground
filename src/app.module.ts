import { Module, Logger, MiddlewareConsumer, NestModule } from '@nestjs/common';
  import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsModule } from './units/units.module';
import { Unit } from './units/model/unit.entity';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/model/user.entity';
import { RolesGuard } from './token-validator/guards/roles.guard';
import { UserFromJwt } from './token-validator/middlewares/user-from-jwt.middleware';
import { TokenEncoderModule } from './token-encoder/token-encoder.module';
import { TokenValidatorModule } from './token-validator/token-validator.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'username',
      password: 'password',
      database: 'units',
      entities: [Unit, User],
      synchronize: true,
    }),
    UnitsModule,
    AuthModule,
    UsersModule,
    TokenEncoderModule,
    TokenValidatorModule,
  ],
  providers: [Logger, {
    provide: APP_FILTER,
    useClass: HttpExceptionFilter
  }, {
    provide: APP_GUARD,
    useClass: RolesGuard
  }]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserFromJwt)
      .forRoutes('*');
  }
}
