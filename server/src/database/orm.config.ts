import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmModuleOptions: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
  autoLoadEntities: true,
};

export const OrmConfig = {
  ...typeOrmModuleOptions,
  migrationsTableName: 'migrations',
  migrations: ['src/migrations/*.ts'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
export default OrmConfig;

/**
 * Postuup pre používanie migracii:
 * 1. vygenerovať migráciu v dev prostredí
 * 2. pushnúť zmeny a migráciu na main
 * 3. cez bash zadať príkaz npm typeorm migration:run
 */
