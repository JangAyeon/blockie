import { useEffect, useState } from "react";
import { useSocket } from "./useSocket";

// 타입 정의
export interface ChatMessage {
  id: string;
  message: string;
  user: string;
  userId: string;
  roomId: string;
  timestamp: string;
  type: "message" | "system" | "join" | "leave";
}

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

export interface User {
  id: string;
  username: string;
}

export interface TypingUser {
  user: string;
  userId: string;
  isTyping: boolean;
}

export const useRoomChat = (serverUrl: string) => {
  const { socket, isConnected } = useSocket(serverUrl);

  // 상태
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [rooms, setRooms] = useState<RoomInfo[]>([]);
  const [currentRoom, setCurrentRoom] = useState<string | null>(null);
  const [currentRoomName, setCurrentRoomName] = useState<string>("");
  const [roomUsers, setRoomUsers] = useState<User[]>([]);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const [error, setError] = useState<string>("");

  // 이벤트 리스너 등록
  useEffect(() => {
    if (!socket) return;

    // 메시지 수신
    socket.on("receiveMessage", (message: ChatMessage) => {
      setMessages((prev) => [...prev, message]);
    });

    // 방 목록 업데이트
    socket.on("roomList", (data: { rooms: RoomInfo[]; totalRooms: number }) => {
      setRooms(data.rooms);
    });

    // 방 생성 성공
    socket.on("roomCreated", (data: any) => {
      setCurrentRoom(data.data.roomId);
      setCurrentRoomName(data.data.roomName);
      setMessages([]); // 새 방이므로 메시지 초기화
      setError("");
    });

    // 방 입장 성공
    socket.on("roomJoined", (data: any) => {
      setCurrentRoom(data.data.roomId);
      setCurrentRoomName(data.data.roomName);
      setMessages([]); // 새 방이므로 메시지 초기화
      setError("");
    });

    // 방 나가기 성공
    socket.on("roomLeft", () => {
      setCurrentRoom(null);
      setCurrentRoomName("");
      setMessages([]);
      setRoomUsers([]);
      setError("");
    });

    // 방 사용자 목록 업데이트
    socket.on("roomUsers", (users: User[]) => {
      setRoomUsers(users);
    });

    // 타이핑 상태
    socket.on("userTyping", (data: TypingUser) => {
      setTypingUsers((prev) => {
        const filtered = prev.filter((user) => user.userId !== data.userId);
        if (data.isTyping) {
          return [...filtered, data];
        }
        return filtered;
      });

      // 3초 후 타이핑 상태 자동 제거
      if (data.isTyping) {
        setTimeout(() => {
          setTypingUsers((prev) =>
            prev.filter((user) => user.userId !== data.userId)
          );
        }, 3000);
      }
    });

    // 에러 처리
    socket.on("error", (errorData: { error: string; message: string }) => {
      setError(errorData.message);
      setTimeout(() => setError(""), 5000); // 5초 후 에러 메시지 제거
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("roomList");
      socket.off("roomCreated");
      socket.off("roomJoined");
      socket.off("roomLeft");
      socket.off("roomUsers");
      socket.off("userTyping");
      socket.off("error");
    };
  }, [socket]);

  // 방 생성
  const createRoom = (roomName: string, username: string) => {
    if (!socket || !roomName.trim() || !username.trim()) return;

    socket.emit("createRoom", {
      roomName: roomName.trim(),
      username: username.trim(),
    });
  };

  // 방 입장
  const joinRoom = (roomId: string, username: string) => {
    if (!socket || !roomId || !username.trim()) return;

    socket.emit("joinRoom", {
      roomId,
      username: username.trim(),
    });
  };

  // 방 나가기
  const leaveRoom = () => {
    if (!socket || !currentRoom) return;

    socket.emit("leaveRoom", {
      roomId: currentRoom,
    });
  };

  // 메시지 전송
  const sendMessage = (message: string) => {
    if (!socket || !currentRoom || !message.trim()) return;

    socket.emit("sendMessage", {
      message: message.trim(),
      roomId: currentRoom,
    });
  };

  // 타이핑 상태 전송
  const sendTyping = (isTyping: boolean, username: string) => {
    if (!socket || !currentRoom || !username) return;

    socket.emit("typing", {
      user: username,
      userId: socket.id,
      roomId: currentRoom,
      isTyping,
    });
  };

  // 방 목록 새로고침
  const refreshRooms = () => {
    if (!socket) return;
    socket.emit("getRoomList");
  };

  // 현재 타이핑 중인 사용자들의 이름
  const getTypingUserNames = (): string[] => {
    return typingUsers.filter((user) => user.isTyping).map((user) => user.user);
  };

  return {
    // 상태
    messages,
    rooms,
    currentRoom,
    currentRoomName,
    roomUsers,
    typingUsers: getTypingUserNames(),
    error,
    isConnected,

    // 액션
    createRoom,
    joinRoom,
    leaveRoom,
    sendMessage,
    sendTyping,
    refreshRooms,
  };
};
