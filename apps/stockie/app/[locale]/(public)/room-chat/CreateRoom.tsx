import { useState } from "react";

interface CreateRoomProps {
  username: string;
  onCreateRoom: (roomName: string, username: string) => void;
  disabled: boolean;
}

export default function CreateRoom({
  username,
  onCreateRoom,
  disabled,
}: CreateRoomProps) {
  const [roomName, setRoomName] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateRoom = async () => {
    if (!roomName.trim() || disabled || isCreating) return;

    setIsCreating(true);
    onCreateRoom(roomName.trim(), username);

    // 2초 후 로딩 상태 해제 (실제로는 서버 응답으로 처리)
    setTimeout(() => {
      setIsCreating(false);
      setRoomName(""); // 방 이름 초기화
    }, 2000);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">✨ 새 방 만들기</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            방 이름
          </label>
          <input
            type="text"
            placeholder="방 이름을 입력하세요 (최대 30자)"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleCreateRoom();
              }
            }}
            disabled={disabled || isCreating}
            maxLength={30}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
          />
          <div className="text-xs text-gray-500 mt-1">
            {roomName.length}/30자
          </div>
        </div>

        <button
          onClick={handleCreateRoom}
          disabled={!roomName.trim() || disabled || isCreating}
          className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
        >
          {isCreating ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              <span>생성 중...</span>
            </>
          ) : (
            <>
              <span>🚀</span>
              <span>방 만들기</span>
            </>
          )}
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">💡 팁</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• 방 이름은 다른 사용자들이 볼 수 있어요</li>
          <li>• 방을 만들면 자동으로 입장됩니다</li>
          <li>• 마지막 사용자가 나가면 방이 삭제돼요</li>
        </ul>
      </div>
    </div>
  );
}
