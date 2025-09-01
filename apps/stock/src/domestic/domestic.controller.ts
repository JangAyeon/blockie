import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  Sse,
  MessageEvent,
  Post,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';

import { DomesticService } from './domestic.service';
// import { TokenAuthGuard } from 'src/token/token.guard';
import { GetToken } from 'src/token/token.decorator';
// import { DomestickWebsocketService } from './domestic-websocket.service';

@ApiTags('Domestic (국내 주식 관련 API)')
@Controller('stock')
// @UseGuards(TokenAuthGuard)
@ApiBearerAuth('access-token')
export class DomesticController {
  constructor(
    private readonly domesticService: DomesticService,
    // private readonly domesticWebsocketService: DomestickWebsocketService,
  ) {}
  @Post('accessToken')
  @ApiOperation({
    summary: 'KIS REST API Access Token',
    description: 'KIS Rest Api Access Token 요청',
  })
  async getApiToken() {
    return this.domesticService.getAccessToken();
  }

  @Get('price/:stockCode')
  @ApiOperation({
    summary: '주식 현재가 조회',
    description: '특정 종목의 현재가 정보를 조회합니다.',
  })
  @ApiParam({
    name: 'stockCode',
    description: '종목코드 (6자리)',
    example: '005930',
  })
  async getCurrentPrice(
    @GetToken() token: string,
    @Param('stockCode') stockCode: string,
  ) {
    return this.domesticService.getCurrentPrice(token, stockCode);
  }

  @Get('chart/:stockCode')
  @ApiOperation({
    summary: '주식 차트 데이터 조회',
    description: '특정 종목의 일봉 차트 데이터를 조회합니다.',
  })
  @ApiParam({
    name: 'stockCode',
    description: '종목코드 (6자리)',
    example: '005930',
  })
  @ApiQuery({
    name: 'period',
    description: '조회 기간 (일)',
    example: 30,
    required: false,
  })
  async getChart(
    @GetToken() token: string,
    @Param('stockCode') stockCode: string,
    @Query('period') period: number = 30,
  ) {
    return this.domesticService.getDailyChart(token, stockCode, period);
  }

  //   @Sse('realtime/:stockCode')
  //   @ApiOperation({
  //     summary: '주식 실시간 데이터 구독',
  //     description: '특정 종목의 실시간 데이터를 SSE로 구독합니다.',
  //   })
  //   @ApiParam({
  //     name: 'stockCode',
  //     description: '종목코드 (6자리)',
  //     example: '005930',
  //   })
  //   subscribeRealtime(
  //     // @getUser() user: AuthUser,
  //     @Param('stockCode') stockCode: string,
  //   ): Observable<MessageEvent> {
  //     return new Observable((observer) => {
  //       const callback = (data: any) => {
  //         observer.next({
  //           data: JSON.stringify({
  //             stockCode,
  //             timestamp: new Date().toISOString(),
  //             ...data,
  //           }),
  //         } as MessageEvent);
  //       };

  //       this.domesticWebsocketService.subscribeToStock(stockCode, callback);

  //       // 클린업
  //       return () => {
  //         this.domesticWebsocketService.unsubscribeFromStock(stockCode, callback);
  //       };
  //     });
  //   }
}
