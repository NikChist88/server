import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

export const getPostgresConfig = (
  configService: ConfigService,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_DATABASE'),
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/db/migrations/*{.ts,.js}'],
    logging: false,
    synchronize: true,
  };
};