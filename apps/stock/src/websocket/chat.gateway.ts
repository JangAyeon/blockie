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
import { RoomService } from './room.service';
import {
  ChatMessage,
  CreateRoomRequest,
  JoinRoomRequest,
  LeaveRoomRequest,
  SendMessageRequest,
  TypingData,
  RoomInfo,
  ErrorResponse,
  SuccessResponse,
} from './chat.types';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(ChatGateway.name);

  constructor(private readonly roomService: RoomService) {}

  // 클라이언트 연결
  handleConnection(client: Socket) {
    this.logger.log(`클라이언트 연결됨: ${client.id}`);

    // 방 목록 전송
    this.sendRoomList(client);
  }

  // 클라이언트 연결 해제
  handleDisconnect(client: Socket) {
    this.logger.log(`클라이언트 연결 해제됨: ${client.id}`);

    const user = this.roomService.getUser(client.id);
    if (user && user.currentRoom) {
      // 방에서 나가는 시스템 메시지 전송
      this.sendSystemMessage(
        user.currentRoom,
        `${user.username}님이 방을 나갔습니다.`,
        'leave',
      );

      // 방 사용자 목록 업데이트
      this.updateRoomUsers(user.currentRoom);
    }

    // 사용자 제거
    this.roomService.removeUser(client.id);

    // 전체 방 목록 업데이트
    this.broadcastRoomList();
  }

  // 방 생성
  @SubscribeMessage('createRoom')
  handleCreateRoom(
    @MessageBody() data: CreateRoomRequest,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // 사용자 등록
      this.roomService.addUser(client.id, data.username);

      // 방 생성
      const room = this.roomService.createRoom(data.roomName, client.id);

      // 소켓을 방에 입장
      client.join(room.id);

      // 성공 응답
      const response: SuccessResponse = {
        success: true,
        message: '방이 생성되었습니다.',
        data: { roomId: room.id, roomName: room.name },
      };
      client.emit('roomCreated', response);

      // 환영 메시지
      this.sendSystemMessage(
        room.id,
        `${data.username}님이 방을 생성했습니다!`,
        'join',
      );

      // 방 목록 업데이트
      this.broadcastRoomList();

      this.logger.log(
        `방 생성됨: ${room.name} (${room.id}) by ${data.username}`,
      );
    } catch (error) {
      const errorResponse: ErrorResponse = {
        error: 'CREATE_ROOM_FAILED',
        message: '방 생성에 실패했습니다.',
      };
      client.emit('error', errorResponse);
    }
  }

  // 방 입장
  @SubscribeMessage('joinRoom')
  handleJoinRoom(
    @MessageBody() data: JoinRoomRequest,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // 사용자 등록 (이미 있으면 업데이트)
      this.roomService.addUser(client.id, data.username);

      // 방 입장 시도
      const success = this.roomService.joinRoom(data.roomId, client.id);

      if (!success) {
        const errorResponse: ErrorResponse = {
          error: 'JOIN_ROOM_FAILED',
          message: '방 입장에 실패했습니다. (방이 없거나 만원)',
        };
        client.emit('error', errorResponse);
        return;
      }

      // 이전 방에서 나가기
      const rooms = Array.from(client.rooms);
      rooms.forEach((roomId) => {
        if (roomId !== client.id) {
          client.leave(roomId);
        }
      });

      // 새 방에 입장
      client.join(data.roomId);

      // 성공 응답
      const room = this.roomService.getRoom(data.roomId);
      const response: SuccessResponse = {
        success: true,
        message: '방에 입장했습니다.',
        data: { roomId: data.roomId, roomName: room?.name },
      };
      client.emit('roomJoined', response);

      // 입장 시스템 메시지
      this.sendSystemMessage(
        data.roomId,
        `${data.username}님이 방에 입장했습니다.`,
        'join',
      );

      // 방 사용자 목록 업데이트
      this.updateRoomUsers(data.roomId);

      // 방 목록 업데이트
      this.broadcastRoomList();

      this.logger.log(`${data.username}이 방 ${data.roomId}에 입장`);
    } catch (error) {
      const errorResponse: ErrorResponse = {
        error: 'JOIN_ROOM_FAILED',
        message: '방 입장 중 오류가 발생했습니다.',
      };
      client.emit('error', errorResponse);
    }
  }

  // 방 나가기
  @SubscribeMessage('leaveRoom')
  handleLeaveRoom(
    @MessageBody() data: LeaveRoomRequest,
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.roomService.getUser(client.id);
    if (!user) return;

    // 방 나가기
    this.roomService.leaveRoom(data.roomId, client.id);
    client.leave(data.roomId);

    // 나가기 시스템 메시지
    this.sendSystemMessage(
      data.roomId,
      `${user.username}님이 방을 나갔습니다.`,
      'leave',
    );

    // 방 사용자 목록 업데이트
    this.updateRoomUsers(data.roomId);

    // 방 목록 업데이트
    this.broadcastRoomList();

    // 성공 응답
    client.emit('roomLeft', { success: true });
  }

  // 메시지 전송
  @SubscribeMessage('sendMessage')
  handleMessage(
    @MessageBody() data: SendMessageRequest,
    @ConnectedSocket() client: Socket,
  ) {
    const user = this.roomService.getUser(client.id);
    if (!user || user.currentRoom !== data.roomId) {
      const errorResponse: ErrorResponse = {
        error: 'SEND_MESSAGE_FAILED',
        message: '메시지 전송 권한이 없습니다.',
      };
      client.emit('error', errorResponse);
      return;
    }

    const message: ChatMessage = {
      id: this.generateMessageId(),
      message: data.message,
      user: user.username,
      userId: user.id,
      roomId: data.roomId,
      timestamp: new Date().toISOString(),
      type: 'message',
    };

    // 방의 모든 사용자에게 메시지 전송
    this.server.to(data.roomId).emit('receiveMessage', message);

    this.logger.log(`메시지 전송: ${user.username} in ${data.roomId}`);
  }

  // 타이핑 상태
  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: TypingData,
    @ConnectedSocket() client: Socket,
  ) {
    // 본인 제외하고 방의 다른 사용자들에게 타이핑 상태 전송
    client.to(data.roomId).emit('userTyping', {
      user: data.user,
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }

  // 방 목록 요청
  @SubscribeMessage('getRoomList')
  handleGetRoomList(@ConnectedSocket() client: Socket) {
    this.sendRoomList(client);
  }

  // 시스템 메시지 전송
  private sendSystemMessage(
    roomId: string,
    message: string,
    type: 'join' | 'leave' | 'system',
  ) {
    const systemMessage: ChatMessage = {
      id: this.generateMessageId(),
      message,
      user: 'System',
      userId: 'system',
      roomId,
      timestamp: new Date().toISOString(),
      type,
    };

    this.server.to(roomId).emit('receiveMessage', systemMessage);
  }

  // 방 사용자 목록 업데이트
  private updateRoomUsers(roomId: string) {
    const users = this.roomService.getRoomUsers(roomId);
    const userList = users.map((user) => ({
      id: user.id,
      username: user.username,
    }));

    this.server.to(roomId).emit('roomUsers', userList);
  }

  // 방 목록 전송 (개별 클라이언트)
  private sendRoomList(client: Socket) {
    const rooms = this.roomService.getAllRooms();
    const roomList: RoomInfo[] = rooms.map((room) => ({
      id: room.id,
      name: room.name,
      userCount: room.users.size,
      users: this.roomService.getRoomUsers(room.id).map((user) => ({
        id: user.id,
        username: user.username,
      })),
      createdAt: room.createdAt.toISOString(),
    }));

    client.emit('roomList', { rooms: roomList, totalRooms: roomList.length });
  }

  // 방 목록 브로드캐스트 (모든 클라이언트)
  private broadcastRoomList() {
    const rooms = this.roomService.getAllRooms();
    const roomList: RoomInfo[] = rooms.map((room) => ({
      id: room.id,
      name: room.name,
      userCount: room.users.size,
      users: this.roomService.getRoomUsers(room.id).map((user) => ({
        id: user.id,
        username: user.username,
      })),
      createdAt: room.createdAt.toISOString(),
    }));

    this.server.emit('roomList', {
      rooms: roomList,
      totalRooms: roomList.length,
    });
  }

  // 메시지 ID 생성
  private generateMessageId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
