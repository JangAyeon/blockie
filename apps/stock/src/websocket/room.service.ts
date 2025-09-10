import { Injectable } from '@nestjs/common';

export interface Room {
  id: string;
  name: string;
  users: Set<string>; // 사용자 ID들
  createdAt: Date;
  maxUsers?: number;
}

export interface User {
  id: string; // socket.id
  username: string;
  currentRoom?: string;
  joinedAt: Date;
}

@Injectable()
export class RoomService {
  private rooms = new Map<string, Room>();
  private users = new Map<string, User>();

  // 방 생성
  createRoom(roomName: string, userId: string): Room {
    const roomId = this.generateRoomId();
    const room: Room = {
      id: roomId,
      name: roomName,
      users: new Set([userId]),
      createdAt: new Date(),
      maxUsers: 50,
    };

    this.rooms.set(roomId, room);

    // 사용자 방 정보 업데이트
    const user = this.users.get(userId);
    if (user) {
      user.currentRoom = roomId;
    }

    return room;
  }

  // 방 입장
  joinRoom(roomId: string, userId: string): boolean {
    const room = this.rooms.get(roomId);
    const user = this.users.get(userId);

    if (!room || !user) return false;

    // 최대 인원 체크
    if (room.maxUsers && room.users.size >= room.maxUsers) {
      return false;
    }

    // 이전 방에서 나가기
    if (user.currentRoom) {
      this.leaveRoom(user.currentRoom, userId);
    }

    // 새 방 입장
    room.users.add(userId);
    user.currentRoom = roomId;

    return true;
  }

  // 방 나가기
  leaveRoom(roomId: string, userId: string): boolean {
    const room = this.rooms.get(roomId);
    const user = this.users.get(userId);

    if (!room || !user) return false;

    room.users.delete(userId);
    user.currentRoom = undefined;

    // 방이 비었으면 삭제
    if (room.users.size === 0) {
      this.rooms.delete(roomId);
    }

    return true;
  }

  // 사용자 추가
  addUser(socketId: string, username: string): User {
    const user: User = {
      id: socketId,
      username,
      joinedAt: new Date(),
    };

    this.users.set(socketId, user);
    return user;
  }

  // 사용자 제거
  removeUser(socketId: string): void {
    const user = this.users.get(socketId);
    if (user && user.currentRoom) {
      this.leaveRoom(user.currentRoom, socketId);
    }
    this.users.delete(socketId);
  }

  // 모든 방 목록 가져오기
  getAllRooms(): Room[] {
    return Array.from(this.rooms.values()).map((room) => ({
      ...room,
      users: new Set([...room.users]), // 복사본 반환
    }));
  }

  // 특정 방 정보 가져오기
  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  // 특정 방의 사용자 목록 가져오기
  getRoomUsers(roomId: string): User[] {
    const room = this.rooms.get(roomId);
    if (!room) return [];

    return Array.from(room.users)
      .map((userId) => this.users.get(userId))
      .filter((user) => user !== undefined) as User[];
  }

  // 사용자 정보 가져오기
  getUser(socketId: string): User | undefined {
    return this.users.get(socketId);
  }

  // 방 ID 생성
  private generateRoomId(): string {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  }

  // 방 이름으로 검색
  findRoomByName(name: string): Room | undefined {
    return Array.from(this.rooms.values()).find(
      (room) => room.name.toLowerCase() === name.toLowerCase(),
    );
  }

  // 통계 정보
  getStats() {
    return {
      totalRooms: this.rooms.size,
      totalUsers: this.users.size,
      activeUsers: Array.from(this.users.values()).filter(
        (user) => user.currentRoom,
      ).length,
    };
  }
}
