import { Inject, Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly configService: ConfigService;

  public createTypeOrmOptions(
    connectionName?: string,
  ): TypeOrmModuleOptions | Promise<TypeOrmModuleOptions> {
    return {
      type: 'postgres',
      host: this.configService.get<string>('database.host'),
      port: this.configService.get<number>('database.port'),
      database: this.configService.get<string>('database.name'),
      username: this.configService.get<string>('database.user'),
      password: this.configService.get<string>('database.password'),
      autoLoadEntities: true,
      synchronize: true,
      logger: "simple-console",
    };
  }
}
