// src/chat/chat.gateway.ts
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';

interface ChatMessage {
  message: string;
  user: string;
}

interface TypingData {
  user: string;
  isTyping: boolean;
}

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000', // Next.js 클라이언트 주소
    methods: ['GET', 'POST'],
  },
})
export class TestWebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(TestWebsocketGateway.name);
  private connectedUsers = new Set<string>();

  handleConnection(client: Socket) {
    this.logger.log(`클라이언트 연결됨: ${client.id}`);

    this.connectedUsers.add(client.id);

    // 모든 클라이언트에게 온라인 사용자 수 전송
    this.server.emit('userCount', this.connectedUsers.size);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`클라이언트 연결 해제됨: ${client.id}`);
    this.connectedUsers.delete(client.id);
    this.server.emit('userCount', this.connectedUsers.size);
  }

  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: ChatMessage,
    @ConnectedSocket() client: Socket,
  ) {
    this.logger.log(`받은 메시지: ${data.user}: ${data.message}`);

    // 모든 클라이언트에게 메시지 전송 (본인 포함)
    this.server.emit('receiveMessage', {
      message: data.message,
      user: data.user,
      timestamp: new Date().toISOString(),
    });
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: TypingData,
    @ConnectedSocket() client: Socket,
  ) {
    // 발신자를 제외한 모든 클라이언트에게 타이핑 상태 전송
    client.broadcast.emit('userTyping', {
      user: data.user,
      isTyping: data.isTyping,
    });
  }
}
