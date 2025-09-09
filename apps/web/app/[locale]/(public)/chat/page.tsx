// components/Chat.tsx
"use client";
import { useSocket } from "@hook/useSocket";
import { useState, useEffect } from "react";

interface Message {
  message: string;
  user: string;
  timestamp: string;
}

export default function Chat() {
  const { socket, isConnected } = useSocket("http://localhost:3001"); // NestJS 서버 주소
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");
  const [isTyping, setIsTyping] = useState("");

  useEffect(() => {
    if (!socket) return;

    // 메시지 받기
    socket.on("receiveMessage", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    // 타이핑 상태 받기
    socket.on("userTyping", (data: { user: string; isTyping: boolean }) => {
      if (data.isTyping) {
        setIsTyping(`${data.user}님이 입력 중...`);
      } else {
        setIsTyping("");
      }
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("userTyping");
    };
  }, [socket]);

  const sendMessage = () => {
    if (!socket || !inputMessage.trim() || !username.trim()) return;

    socket.emit("sendMessage", {
      message: inputMessage,
      user: username,
    });

    setInputMessage("");
  };

  const handleTyping = (isTyping: boolean) => {
    if (!socket || !username.trim()) return;

    socket.emit("typing", {
      user: username,
      isTyping,
    });
  };

  if (!username) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl mb-4">채팅방 입장</h1>
        <input
          type="text"
          placeholder="닉네임을 입력하세요"
          className="border p-2 rounded mb-4"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              setUsername((e.target as HTMLInputElement).value);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen max-w-2xl mx-auto p-4">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">실시간 채팅</h1>
        <div className="text-sm text-gray-600">
          상태: {isConnected ? "🟢 연결됨" : "🔴 연결 안됨"} | 사용자:{" "}
          {username}
        </div>
      </div>

      {/* 메시지 목록 */}
      <div className="flex-1 border rounded p-4 mb-4 overflow-y-auto bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-gray-500 text-center">메시지가 없습니다.</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <span className="font-semibold text-blue-600">{msg.user}:</span>
              <span className="ml-2">{msg.message}</span>
              <span className="text-xs text-gray-400 ml-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          ))
        )}
        {isTyping && (
          <div className="text-gray-500 italic text-sm">{isTyping}</div>
        )}
      </div>

      {/* 메시지 입력 */}
      <div className="flex gap-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendMessage();
              handleTyping(false);
            }
          }}
          onFocus={() => handleTyping(true)}
          onBlur={() => handleTyping(false)}
          placeholder="메시지를 입력하세요..."
          className="flex-1 border rounded px-3 py-2"
          disabled={!isConnected}
        />
        <button
          onClick={sendMessage}
          disabled={!isConnected || !inputMessage.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          전송
        </button>
      </div>
    </div>
  );
}
