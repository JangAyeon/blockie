// In Next.js, this file would be called: app/providers.tsx
"use client";

// Since QueryClientProvider relies on useContext under the hood, we have to put 'use client' on top
import { isServer, QueryClient } from "@tanstack/react-query";

const defaultOptions = {
  queries: {
    // With SSR, we usually want to set some default staleTime
    // above 0 to avoid refetching immediately on the client
    staleTime: 60 * 1000, // 기본 캐싱 시간 1분
    retry: 1,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  },
};

function makeQueryClient() {
  return new QueryClient({
    defaultOptions,
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient(); // 서버에서 실행 중인 경우 새 클라이언트를 반환
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient(); // 브라우저에서 클라이언트가 없는 경우 새 클라이언트를 생성
    return browserQueryClient; // 기존 브라우저 클라이언트 반환
  }
}
