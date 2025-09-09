import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import {
  DailyChartPeriod,
  KISAccessTokenResponse,
  StockPriceResponse,
  StockDailyResponse,
  StockTimeResponse,
  InquireDailyItemChartPriceResponse,
} from '@repo/types';

@Injectable()
export class DomesticService {
  private readonly logger = new Logger(DomesticService.name);
  private readonly baseUrl = 'https://openapi.koreainvestment.com:9443';
  private accessToken: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // 액세스 토큰 발급
  async getAccessToken(): Promise<KISAccessTokenResponse> {
    // if (this.accessToken) return this.accessToken;

    try {
      const response =
        await this.httpService.axiosRef.post<KISAccessTokenResponse>(
          `${this.baseUrl}/oauth2/tokenP`,
          {
            grant_type: 'client_credentials',
            appkey: this.configService.get('KIS_APP_KEY'),
            appsecret: this.configService.get('KIS_APP_SECRET'),
          },
          {
            headers: {
              'Content-Type': 'application/json; charset=utf-8',
            },
          },
        );

      this.accessToken = response.data.access_token;
      return response.data;
    } catch (error) {
      this.logger.error('Access token 발급 실패:', error?.message);
      throw error;
    }
  }

  // 현재가 조회
  async getCurrentPrice(
    token: string,
    stockCode: string,
  ): Promise<StockPriceResponse> {
    // const token = await this.getAccessToken();
    // // const token = this.accessToken;
    console.log('getCurrentPrice token: ', token, ' stockCode: ', stockCode);
    try {
      const response = await this.httpService.axiosRef.get<StockPriceResponse>(
        `${this.baseUrl}/uapi/domestic-stock/v1/quotations/inquire-price`,
        {
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            Authorization: `Bearer ${token}`,
            appkey: this.configService.get('KIS_APP_KEY'),
            appsecret: this.configService.get('KIS_APP_SECRET'),
            tr_id: 'FHKST01010100',
            custtype: 'P',
          },
          params: {
            FID_COND_MRKT_DIV_CODE: 'J' /* J:KRX, NX:NXT, UN:통합 */,
            FID_INPUT_ISCD: stockCode,
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('현재가 조회 실패:', error);
      throw error;
    }
  }

  // 주식현재가 일자별
  async getDailyChart(
    token: string,
    stockCode: string,
    period: DailyChartPeriod,
  ): Promise<StockDailyResponse> {
    console.log(
      'getDailyChart token: ',
      token,
      ' stockCode: ',
      stockCode,
      ' period:',
      period,
    );

    try {
      const response = await this.httpService.axiosRef.get<StockDailyResponse>(
        `${this.baseUrl}/uapi/domestic-stock/v1/quotations/inquire-daily-price`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            appkey: this.configService.get('KIS_APP_KEY'),
            appsecret: this.configService.get('KIS_APP_SECRET'),
            tr_id: 'FHKST01010400',
          },
          params: {
            FID_COND_MRKT_DIV_CODE: 'J' /* J:KRX, NX:NXT, UN:통합 */,
            FID_INPUT_ISCD: stockCode,
            FID_PERIOD_DIV_CODE: period,
            /* 기간분류코드: 
            D : (일)최근 30거래일
            W : (주)최근 30주
            M : (월)최근 30개월 */
            FID_ORG_ADJ_PRC: '1',
            /* 수정주가 원주가 가격:
            0 : 수정주가미반영
            1 : 수정주가반영
            * 수정주가는 액면분할/액면병합 등 권리 발생 시 과거 시세를 현재 주가에 맞게 보정한 가격
            */
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('일봉 차트 조회 실패:', error);
      throw error;
    }
  }
  async getTradeChart(
    token: string,
    stockCode: string,
    startDate: string,
    endDate: string,
    period: DailyChartPeriod,
  ): Promise<InquireDailyItemChartPriceResponse> {
    console.log(
      'getTradeChart token: ',
      token,
      ' stockCode: ',
      stockCode,
      ' period:',
      period,
    );

    try {
      const response =
        await this.httpService.axiosRef.get<InquireDailyItemChartPriceResponse>(
          `${this.baseUrl}/uapi/domestic-stock/v1/quotations/inquire-daily-itemchartprice`,
          {
            headers: {
              'Content-Type': 'application/json',
              authorization: `Bearer ${token}`,
              appkey: this.configService.get('KIS_APP_KEY'),
              appsecret: this.configService.get('KIS_APP_SECRET'),
              tr_id: 'FHKST03010100',
            },
            params: {
              FID_COND_MRKT_DIV_CODE: 'J' /* J:KRX, NX:NXT, UN:통합 */,
              FID_INPUT_ISCD: stockCode,
              FID_INPUT_DATE_1: startDate /* 조회 시작일자 */,
              FID_INPUT_DATE_2: endDate /* 조회 종료일자 (최대 100개)*/,
              FID_PERIOD_DIV_CODE: period /* D:일봉 W:주봉, M:월봉, Y:년봉 */,
              FID_ORG_ADJ_PRC: '1',
              /* 수정주가 원주가 가격:
            0 : 수정주가미반영
            1 : 수정주가반영
            * 수정주가는 액면분할/액면병합 등 권리 발생 시 과거 시세를 현재 주가에 맞게 보정한 가격
            */
            },
          },
        );

      console.log('####', response);
      return response.data;
    } catch (error) {
      this.logger.error('일봉 차트 조회 실패:', error);
      throw error;
    }
  }
  // 국내주식기간별시세(일/주/월/년)
  async getTimeChart(
    token: string,
    ticker: string,
    inqr_start_dt: string,
  ): Promise<StockTimeResponse> {
    try {
      const response = await this.httpService.axiosRef.get<StockTimeResponse>(
        `${this.baseUrl}/uapi/domestic-stock/v1/quotations/inquire-time-itemchartprice`,
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
            appkey: this.configService.get('KIS_APP_KEY'),
            appsecret: this.configService.get('KIS_APP_SECRET'),
            tr_id: 'FHKST03010200',
            custtype: 'P',
          },
          params: {
            FID_COND_MRKT_DIV_CODE: 'J' /* J:KRX, NX:NXT, UN:통합 */,
            FID_INPUT_ISCD: `${ticker}`,
            FID_INPUT_HOUR_1: `${inqr_start_dt}`,
            FID_PW_DATA_INCU_YN: `Y`,
            FID_ETC_CLS_CODE: '00',
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('일봉 차트 조회 실패:', error);
      throw error;
    }
  }
}
