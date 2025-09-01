import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { DomesticController } from './domestic.controller';

import { DomesticService } from './domestic.service';
// import { DomestickWebsocketService } from './domestic-websocket.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [DomesticService /*, DomestickWebsocketService*/],
  controllers: [DomesticController],
  exports: [DomesticService /*,  DomestickWebsocketService*/],
})
export class DomesticModule {}
