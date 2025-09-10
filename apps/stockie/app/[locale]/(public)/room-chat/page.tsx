"use client";
import { useState } from "react";
import { useRoomChat } from "@hook/useRoomChat";
import RoomList from "./RoomList";
import ChatRoom from "./ChatRoom";
import CreateRoom from "./CreateRoom";

export default function RoomChatPage() {
  const [username, setUsername] = useState("");
  const [currentView, setCurrentView] = useState<"lobby" | "room">("lobby");

  const roomChat = useRoomChat("http://localhost:3001");

  // 사용자명 설정 단계
  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full mx-4">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              💬 방 채팅
            </h1>
            <p className="text-gray-600">
              닉네임을 입력하고 채팅을 시작하세요!
            </p>
          </div>

          <div className="space-y-4">
            <input
              type="text"
              placeholder="닉네임을 입력하세요 (2-20자)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && username.trim().length >= 2) {
                  setUsername(username.trim());
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-center text-lg"
              maxLength={20}
            />

            <button
              onClick={() => {
                if (username.trim().length >= 2) {
                  setUsername(username.trim());
                }
              }}
              disabled={username.trim().length < 2}
              className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              입장하기
            </button>
          </div>

          <div className="mt-4 text-xs text-gray-500 text-center">
            실시간 방 채팅 서비스입니다
          </div>
        </div>
      </div>
    );
  }

  // 방에 있을 때
  if (roomChat.currentRoom) {
    return (
      <ChatRoom
        roomChat={roomChat}
        username={username}
        onLeaveRoom={() => {
          roomChat.leaveRoom();
          setCurrentView("lobby");
        }}
      />
    );
  }

  // 로비 (방 목록)
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* 헤더 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                안녕하세요, {username}님! 👋
              </h1>
              <p className="text-gray-600 mt-1">
                채팅방을 선택하거나 새로운 방을 만들어보세요
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* 연결 상태 */}
              <div className="flex items-center space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    roomChat.isConnected ? "bg-green-500" : "bg-red-500"
                  }`}
                />
                <span className="text-sm text-gray-600">
                  {roomChat.isConnected ? "연결됨" : "연결 안됨"}
                </span>
              </div>

              {/* 새로고침 버튼 */}
              <button
                onClick={roomChat.refreshRooms}
                className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-lg text-sm transition-colors"
              >
                🔄 새로고침
              </button>
            </div>
          </div>
        </div>

        {/* 에러 메시지 */}
        {roomChat.error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            ❌ {roomChat.error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 방 생성 */}
          <div className="lg:col-span-1">
            <CreateRoom
              username={username}
              onCreateRoom={roomChat.createRoom}
              disabled={!roomChat.isConnected}
            />
          </div>

          {/* 방 목록 */}
          <div className="lg:col-span-2">
            <RoomList
              rooms={roomChat.rooms}
              username={username}
              onJoinRoom={roomChat.joinRoom}
              isConnected={roomChat.isConnected}
            />
          </div>
        </div>

        {/* 통계 */}
        <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
          <div className="flex justify-center space-x-8 text-sm text-gray-600">
            <div>
              📊 총 방 개수:{" "}
              <span className="font-semibold">{roomChat.rooms.length}개</span>
            </div>
            <div>
              👥 총 사용자:{" "}
              <span className="font-semibold">
                {roomChat.rooms.reduce((sum, room) => sum + room.userCount, 0)}
                명
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
