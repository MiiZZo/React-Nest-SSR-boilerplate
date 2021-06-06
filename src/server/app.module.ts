import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AppController } from "./app.controller";
import { User } from "./model/user";
console.log(join(__dirname, "../../dist/client/js"))
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'user',
      password: '11197811',
      database: 'test',
      entities: [User],
      synchronize: true,
    }),
  ],
  controllers: [AppController]
})
export class AppModule {}
