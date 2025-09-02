/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Controller, Get, Param, Query, Post } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { DailyChartPeriod } from '@repo/types';
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

  @Get('daily/:ticker')
  @ApiOperation({
    summary: '주식 차트 데이터 조회',
    description: '최근 30거래일(D), 30주(W), 30개월(M)의 과거 가격 데이터 제공',
  })
  @ApiParam({
    name: 'ticker',
    description: '종목코드 (6자리)',
    example: '005930',
  })
  @ApiQuery({
    name: 'period',
    description: '조회 단위 (일/주/월)',
    enum: ['D', 'W', 'M'], // 하드코딩 가능
    example: 'D',
  })
  async getDailyChart(
    @GetToken() token: string,
    @Param('ticker') ticker: string,
    @Query('period') period: DailyChartPeriod = 'D',
  ) {
    return this.domesticService.getDailyChart(token, ticker, period);
  }
  @Get('time/:ticker')
  @ApiOperation({
    summary: '주식당일분봉조회',
    description:
      '당일 분봉 데이터 (FID_INPUT_HOUR_1 에 미래일시 입력 시에 현재가로 조회)',
  })
  @ApiParam({
    name: 'ticker',
    description: '종목코드 (6자리)',
    example: '005930',
  })
  @ApiQuery({
    name: 'inqr_start_dt',
    description:
      '조회 시작일자(HHMMSS): "123000" 입력 시 12시 30분 이전부터 1분 간격으로 조회',
    example: '090000',
  })
  async getTimeChart(
    @GetToken() token: string,
    @Param('ticker') ticker: string,
    @Query('inqr_start_dt') inqr_start_dt: string,
  ) {
    return this.domesticService.getTimeChart(token, ticker, inqr_start_dt);
  }
}
