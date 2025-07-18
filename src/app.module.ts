import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configuration from "./configuration/environment.configuration"

@Module({
  imports: [ConfigModule.forRoot({
   load: [configuration],
  }), UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
