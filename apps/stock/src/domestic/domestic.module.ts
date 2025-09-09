import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DomesticController } from './domestic.controller';
import { DomesticService } from './domestic.service';
import { TestWebsocketGateway } from 'src/websocket/test.gateway';
// import { DomestickWebsocketService } from './domestic-websocket.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    DomesticService,
    TestWebsocketGateway /*, DomestickWebsocketService*/,
  ],
  controllers: [DomesticController],
  exports: [
    DomesticService,
    TestWebsocketGateway /*,  DomestickWebsocketService*/,
  ],
})
export class DomesticModule {}
