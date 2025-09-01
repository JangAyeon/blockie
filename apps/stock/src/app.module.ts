import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DomesticModule } from './domestic/domestic.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전역으로 사용
      envFilePath: '.env', // .env 파일 경로 명시
    }),
    DomesticModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
