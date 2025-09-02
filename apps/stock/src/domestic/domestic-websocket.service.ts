// import {
//   Injectable,
//   Logger,
//   OnModuleInit,
//   OnModuleDestroy,
// } from '@nestjs/common';
// // import { ConfigService } from '@nestjs/config';
// import * as WebSocket from 'ws';

// @Injectable()
// export class DomestickWebsocketService
//   implements OnModuleInit, OnModuleDestroy
// {
//   private readonly logger = new Logger(DomestickWebsocketService.name);
//   private ws: WebSocket;
//   private subscribers = new Map<string, Set<(data: any) => void>>();

//   //   constructor(private readonly configService: ConfigService) {}

//   async onModuleInit() {
//     await this.connect();
//   }

//   onModuleDestroy() {
//     if (this.ws) {
//       this.ws.close();
//     }
//   }

//   private async connect() {
//     try {
//       this.ws = new WebSocket('ws://ops.koreainvestment.com:21000');

//       this.ws.on('open', () => {
//         this.logger.log('WebSocket 연결됨');
//         this.sendApprovalRequest();
//       });

//       this.ws.on('message', (data) => {
//         try {
//           const message = JSON.parse(data.toString());
//           this.handleMessage(message);
//         } catch (error) {
//           this.logger.error('메시지 파싱 오류:', error);
//         }
//       });

//       this.ws.on('error', (error) => {
//         this.logger.error('WebSocket 오류:', error);
//       });

//       this.ws.on('close', () => {
//         this.logger.log('WebSocket 연결 종료');
//         // 재연결 로직
//         setTimeout(() => this.connect(), 5000);
//       });
//     } catch (error) {
//       this.logger.error('WebSocket 연결 실패:', error);
//     }
//   }

//   private sendApprovalRequest() {
//     const approvalData = {
//       header: {
//         approval_key: process.env.KIS_APPROVAL_KEY,
//         custtype: 'P',
//         tr_type: '1',
//         'content-type': 'utf-8',
//       },
//       body: {
//         input: {
//           tr_id: 'FHKST01010100',
//           tr_key: '',
//         },
//       },
//     };

//     this.ws.send(JSON.stringify(approvalData));
//   }

//   // 주식 실시간 데이터 구독
//   subscribeToStock(stockCode: string, callback: (data: any) => void) {
//     if (!this.subscribers.has(stockCode)) {
//       this.subscribers.set(stockCode, new Set());
//       this.sendSubscription(stockCode);
//     }

//     this.subscribers.get(stockCode)!.add(callback);
//   }

//   // 구독 해제
//   unsubscribeFromStock(stockCode: string, callback: (data: any) => void) {
//     const stockSubscribers = this.subscribers.get(stockCode);
//     if (stockSubscribers) {
//       stockSubscribers.delete(callback);
//       if (stockSubscribers.size === 0) {
//         this.subscribers.delete(stockCode);
//         this.sendUnsubscription(stockCode);
//       }
//     }
//   }

//   private sendSubscription(stockCode: string) {
//     const subscriptionData = {
//       header: {
//         approval_key: process.env.KIS_APPROVAL_KEY,
//         custtype: 'P',
//         tr_type: '1',
//         'content-type': 'utf-8',
//       },
//       body: {
//         input: {
//           tr_id: 'H0STCNT0',
//           tr_key: stockCode,
//         },
//       },
//     };

//     this.ws.send(JSON.stringify(subscriptionData));
//   }

//   private sendUnsubscription(stockCode: string) {
//     const unsubscriptionData = {
//       header: {
//         approval_key: process.env.KIS_APPROVAL_KEY,
//         custtype: 'P',
//         tr_type: '2',
//         'content-type': 'utf-8',
//       },
//       body: {
//         input: {
//           tr_id: 'H0STCNT0',
//           tr_key: stockCode,
//         },
//       },
//     };

//     this.ws.send(JSON.stringify(unsubscriptionData));
//   }

//   private handleMessage(message: any) {
//     if (message.body && message.body.rt_cd === '0') {
//       const stockCode = message.body.tr_key;
//       const subscribers = this.subscribers.get(stockCode);

//       if (subscribers) {
//         subscribers.forEach((callback) => {
//           callback(message.body);
//         });
//       }
//     }
//   }
// }
