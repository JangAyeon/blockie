import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DomesticController } from './domestic.controller';
import { DomesticService } from './domestic.service';
import { TestWebsocketGateway } from 'src/websocket/test.gateway';
import { ChatGateway } from 'src/websocket/chat.gateway';
import { RoomService } from 'src/websocket/room.service';
// import { DomestickWebsocketService } from './domestic-websocket.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [
    DomesticService,
    TestWebsocketGateway,
    ChatGateway,
    RoomService /*, DomestickWebsocketService*/,
  ],
  controllers: [DomesticController],
  exports: [
    DomesticService,
    TestWebsocketGateway,
    ChatGateway,
    RoomService /*,  DomestickWebsocketService*/,
  ],
})
export class DomesticModule {}
