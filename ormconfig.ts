import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [__dirname + 'dist/**/*.entity.js'],
  logging: true,
  synchronize: false,
  migrationsRun: false,
  migrations: [__dirname + 'dist/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});
