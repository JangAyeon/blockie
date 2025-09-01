import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DomesticService {
  private readonly logger = new Logger(DomesticService.name);
  private readonly baseUrl = 'https://openapi.koreainvestment.com:9443';
  private accessToken: string;
  // private readonly appkey = 'PSUVoLDlZYICMlol7mN0QWmMj4vChD6BhVI2';
  // private readonly appsecret =
  //   'KRR5Cq+TsYWztpQJHgxh/l0OzMYO07n6HDz5CznLd32DhZfxEuHJA+pn4pczaZZyUNgmbijR9OTXnjKDjenWjnTWtyZglHYrIgMet0m2GN5T6s4VMG66BHP9/QrlGGk/SwGpyDVu506xtHe3ykMtycpa9sLIfBJ8Z2IS1fEpG3FVyKFw+fs=';

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  // 액세스 토큰 발급
  async getAccessToken(): Promise<void> {
    // if (this.accessToken) return this.accessToken;

    try {
      const response = await this.httpService.axiosRef.post(
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
  async getCurrentPrice(token: string, stockCode: string) {
    // const token = await this.getAccessToken();
    // // const token = this.accessToken;
    console.log('getCurrentPrice token: ', token, ' stockCode: ', stockCode);
    try {
      const response = await this.httpService.axiosRef.get(
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
            FID_COND_MRKT_DIV_CODE: 'J',
            FID_INPUT_ISCD: stockCode,
          },
        },
      );

      return response.data;
    } catch (error) {
      this.logger.error('현재가 조회 실패:', error);
      //   throw error;
    }
  }

  // 일봉 차트 조회
  async getDailyChart(token: string, stockCode: string, period: number = 30) {
    // // const token = await this.getAccessToken();
    // const token = this.accessToken;
    console.log('getDailyChart token: ', token, ' stockCode: ', stockCode);

    try {
      const response = await this.httpService.axiosRef.get(
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
            FID_COND_MRKT_DIV_CODE: 'J',
            FID_INPUT_ISCD: stockCode,
            FID_PERIOD_DIV_CODE: 'D',
            FID_ORG_ADJ_PRC: '1',
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
