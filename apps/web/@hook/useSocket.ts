import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export const useSocket = (serverPath: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(serverPath);

    socketInstance.on("connect", () => {
      console.log("소켓 연결됨");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("소켓 연결 해제됨");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [serverPath]);

  return { socket, isConnected };
};
