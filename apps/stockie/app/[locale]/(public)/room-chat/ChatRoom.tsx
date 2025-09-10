import { useState, useRef, useEffect, Fragment } from "react";
import { ChatMessage, User } from "@hook/useRoomChat";
import { parseHDFSASP0 } from "./parseHDFSASP0";

interface ChatRoomProps {
  roomChat: any; // useRoomChat의 반환 타입
  username: string;
  onLeaveRoom: () => void;
}

export default function ChatRoom({
  roomChat,
  username,
  onLeaveRoom,
}: ChatRoomProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [socketError, setSocketError] = useState("");

  // 자동 스크롤
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomChat.messages]);

  useEffect(() => {
    console.log("RoomName: ", roomChat.currentRoomName);
    let socket: WebSocket | null = null;
    let lastUpdateTime = 0;

    const connectWebSocket = async () => {
      try {
        socket = new WebSocket(
          "ws://ops.koreainvestment.com:21000/tryitout/HDFSASP0"
        );

        socket.onopen = () => {
          const requestData = {
            header: {
              approval_key: "19cd7c1b-27d1-4f9b-9922-bcab34f5438c",
              custtype: "P",
              tr_type: "1",
              "content-type": "utf-8",
            },
            body: {
              input: {
                tr_id: "HDFSASP0",
                tr_key: roomChat.currentRoomName,
              },
            },
          };

          socket?.send(JSON.stringify(requestData));
          setIsConnected(true);
        };

        socket.onmessage = (event) => {
          const currentTime = Date.now();

          if (
            currentTime - lastUpdateTime >= 1000 &&
            event.data.trim().startsWith("0")
          ) {
            lastUpdateTime = currentTime;
            const message = event.data;

            const formattedData = parseHDFSASP0(message);
            console.log("###", formattedData);
            // setLiveData(formattedData);
          }
        };

        socket.onerror = (error) => {
          console.log("WebSocket 에러:", error);
          setSocketError("WebSocket 연결 에러 발생");
        };

        socket.onclose = () => {
          setIsConnected(false);
        };
      } catch (error) {
        console.error("WebSocket 연결 실패:", error);
        setSocketError("WebSocket 연결 실패");
      }
    };

    connectWebSocket();

    return () => {
      if (socket) {
        socket.close();
        socket = null;
      }
    };
  }, [roomChat.currentRoomName]);

  // 타이핑 상태 관리
  const handleTyping = () => {
    if (!isTyping) {
      setIsTyping(true);
      roomChat.sendTyping(true, username);
    }

    // 기존 타이머 클리어
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // 1초 후 타이핑 상태 해제
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      roomChat.sendTyping(false, username);
    }, 1000);
  };

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    roomChat.sendMessage(inputMessage);
    setInputMessage("");

    // 타이핑 상태 즉시 해제
    if (isTyping) {
      setIsTyping(false);
      roomChat.sendTyping(false, username);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderMessage = (message: ChatMessage) => {
    const isMyMessage = message.user === username;
    const isSystemMessage = message.type !== "message";

    if (isSystemMessage) {
      return (
        <div className="flex justify-center my-2">
          <div className="bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full">
            {message.message}
          </div>
        </div>
      );
    }

    return (
      <div
        key={message.id}
        className={`flex ${isMyMessage ? "justify-end" : "justify-start"} mb-4`}
      >
        <div
          className={`max-w-xs lg:max-w-md xl:max-w-lg ${isMyMessage ? "order-2" : "order-1"}`}
        >
          {!isMyMessage && (
            <div className="text-xs text-gray-500 mb-1 px-1">
              {message.user}
            </div>
          )}
          <div
            className={`px-4 py-2 rounded-2xl ${
              isMyMessage
                ? "bg-blue-500 text-white rounded-br-none"
                : "bg-gray-200 text-gray-800 rounded-bl-none"
            }`}
          >
            <div>{message.message}</div>
            <div
              className={`text-xs mt-1 ${isMyMessage ? "text-blue-100" : "text-gray-500"}`}
            >
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <button
            onClick={onLeaveRoom}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← 뒤로가기
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-800">
              {roomChat.currentRoomName}
            </h1>
            <p className="text-sm text-gray-600">
              👥 {roomChat.roomUsers.length}명 참여 중
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* 연결 상태 */}
          <div className="flex items-center space-x-2">
            <div
              className={`w-2 h-2 rounded-full ${
                roomChat.isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            <span className="text-sm text-gray-600">
              {roomChat.isConnected ? "연결됨" : "연결 안됨"}
            </span>
          </div>

          {/* 방 정보 */}
          <div className="text-sm text-gray-500">
            방 ID: {roomChat.currentRoom}
          </div>
        </div>
      </div>

      {/* 사용자 목록 (작은 화면에서는 숨김) */}
      <div className="hidden lg:block bg-white border-b p-2">
        <div className="flex flex-wrap gap-2">
          {roomChat.roomUsers.map((user: User) => (
            <span
              key={user.id}
              className={`text-xs px-2 py-1 rounded-full ${
                user.username === username
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {user.username}
              {user.username === username && " (나)"}
            </span>
          ))}
        </div>
      </div>

      {/* 채팅 영역 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {roomChat.messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <div className="text-4xl mb-2">💬</div>
            <p>아직 메시지가 없습니다</p>
            <p className="text-sm">첫 번째 메시지를 보내보세요!</p>
          </div>
        ) : (
          roomChat.messages.map((message: any) => (
            <Fragment key={message.id}>{renderMessage(message)}</Fragment>
          ))
        )}

        {/* 타이핑 표시 */}
        {roomChat.typingUsers.length > 0 && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-600 text-sm px-3 py-2 rounded-2xl rounded-bl-none">
              <div className="flex items-center space-x-1">
                <span>{roomChat.typingUsers.join(", ")}님이 입력 중</span>
                <div className="flex space-x-1">
                  <div className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"></div>
                  <div
                    className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-gray-500 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* 입력 영역 */}
      <div className="bg-white border-t p-4">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => {
              setInputMessage(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="메시지를 입력하세요..."
            disabled={!roomChat.isConnected}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={!roomChat.isConnected || !inputMessage.trim()}
            className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
