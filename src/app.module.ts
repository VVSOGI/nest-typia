import { Module } from '@nestjs/common';
import { Config } from './config/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './services';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: Config.db.host,
      port: Config.db.port,
      password: Config.db.password,
      username: Config.db.username,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      database: Config.db.database,
      synchronize: false,
      logging: false,
    }),
    BoardModule,
  ],
  providers: [],
})
export class AppModule {}
