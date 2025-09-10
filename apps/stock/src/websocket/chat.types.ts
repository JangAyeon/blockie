// 채팅 메시지 타입
export interface ChatMessage {
  id: string;
  message: string;
  user: string;
  userId: string;
  roomId: string;
  timestamp: string;
  type: 'message' | 'system' | 'join' | 'leave';
}

// 방 생성 요청
export interface CreateRoomRequest {
  roomName: string;
  username: string;
}

// 방 입장 요청
export interface JoinRoomRequest {
  roomId: string;
  username: string;
}

// 방 나가기 요청
export interface LeaveRoomRequest {
  roomId: string;
}

// 메시지 전송 요청
export interface SendMessageRequest {
  message: string;
  roomId: string;
}

// 타이핑 상태
export interface TypingData {
  user: string;
  userId: string;
  roomId: string;
  isTyping: boolean;
}

// 방 정보 응답
export interface RoomInfo {
  id: string;
  name: string;
  userCount: number;
  users: Array<{
    id: string;
    username: string;
  }>;
  createdAt: string;
}

// 방 목록 응답
export interface RoomListResponse {
  rooms: RoomInfo[];
  totalRooms: number;
}

// 에러 응답
export interface ErrorResponse {
  error: string;
  message: string;
}

// 성공 응답
export interface SuccessResponse {
  success: boolean;
  message: string;
  data?: any;
}
