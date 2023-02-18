import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import dbConfig from './config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { TypeOrmConfigService } from './shared/typeorm.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CompanyModule } from './company/company.module';
import { MulterModule } from '@nestjs/platform-express';
import { VehicleModule } from './vehicle/vehicle.module';
import { ServiceModule } from './service/service.module';
import { ServicesOfUsersModule } from './services-of-users/services-of-users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [configuration, dbConfig],
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    MulterModule.register({
      dest: './images',
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   debug: true,
    //   playground: false,
    //   typePaths: ['./**/*.graphql'], // şema tanımlarının bulunduğu path
    //   context: ({ req }) => ({ headers: req.headers }),
    //   definitions: {
    //     path: join(process.cwd(), 'src/graphql.schema.ts'), // çıktılar nereye kaydedilecek
    //     outputAs: 'class', // çıktının türü
    //   },
    // }),
    UserModule,
    AuthModule,
    CompanyModule,
    VehicleModule,
    ServiceModule,
    ServicesOfUsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
