import { RoomInfo } from "@hook/useRoomChat";

interface RoomListProps {
  rooms: RoomInfo[];
  username: string;
  onJoinRoom: (roomId: string, username: string) => void;
  isConnected: boolean;
}

export default function RoomList({
  rooms,
  username,
  onJoinRoom,
  isConnected,
}: RoomListProps) {
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60)
    );

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}시간 전`;
    return `${Math.floor(diffInMinutes / 1440)}일 전`;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">
          🏠 채팅방 목록 ({rooms.length})
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          원하는 방을 선택해서 입장하세요
        </p>
      </div>

      <div className="p-6">
        {rooms.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏜️</div>
            <p className="text-gray-500 text-lg">아직 생성된 방이 없습니다</p>
            <p className="text-gray-400 text-sm mt-2">
              첫 번째 방을 만들어보세요!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {rooms.map((room) => (
              <div
                key={room.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-semibold text-gray-800 text-lg">
                        {room.name}
                      </h3>
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                        {room.id}
                      </span>
                    </div>

                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-1">
                        <span>👥</span>
                        <span>{room.userCount}명</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <span>⏰</span>
                        <span>{formatTime(room.createdAt)}</span>
                      </div>
                    </div>

                    {/* 사용자 목록 */}
                    {room.users.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {room.users.slice(0, 5).map((user) => (
                          <span
                            key={user.id}
                            className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                          >
                            {user.username}
                          </span>
                        ))}
                        {room.users.length > 5 && (
                          <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
                            +{room.users.length - 5}명
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onJoinRoom(room.id, username)}
                    disabled={!isConnected}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    입장
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
