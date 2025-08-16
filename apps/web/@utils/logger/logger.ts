"use server";

import { ApiMethod } from "@constant/api.route";
import { EventName, EventType, LogData, LogLevel } from "./logger.types";
import { headers } from "next/headers";

const LOG_LEVELS = {
  development: [LogLevel.ERROR, LogLevel.WARN, LogLevel.INFO, LogLevel.DEBUG],
  production: [LogLevel.ERROR, LogLevel.WARN],
} as const;

const EVENT_LOG_LEVEL_MAP: Record<EventType, LogLevel> = {
  [EventName.RUNTIME_ERROR]: LogLevel.ERROR,
  [EventName.API_ERROR]: LogLevel.ERROR,
  [EventName.NETWORK_ERROR]: LogLevel.ERROR,
  [EventName.SERVER_ERROR]: LogLevel.ERROR,
  [EventName.SERVER_WARNING]: LogLevel.WARN,
  [EventName.MEMORY_WARNING]: LogLevel.WARN,
  [EventName.PERFORMANCE]: LogLevel.INFO,
  [EventName.MIDDLEWARE_REQUEST]: LogLevel.DEBUG,
  [EventName.FETCH]: LogLevel.INFO,
  [EventName.NOT_FOUND]: LogLevel.WARN,
  [EventName.GLOBAL_ERROR]: LogLevel.ERROR,
  [EventName.BAD_REQUEST]: LogLevel.ERROR,
};

function shouldLogEvent(eventType: EventType): boolean {
  const currentEnv = process.env.NODE_ENV as keyof typeof LOG_LEVELS;
  const allowedLevels = LOG_LEVELS[currentEnv] || LOG_LEVELS.production;

  return allowedLevels.includes(
    EVENT_LOG_LEVEL_MAP[eventType] as LogLevel.WARN | LogLevel.ERROR
  );
}

export async function logger(logData: LogData) {
  const currentEnv = process.env.NODE_ENV as keyof typeof LOG_LEVELS;
  const headerList = await headers();
  const userAgent = headerList.get("user-agent") || undefined;
  const isBotTraffic =
    userAgent?.includes("bot") || userAgent?.includes("crawler");

  // 로깅 여부 확인
  if (!shouldLogEvent(logData.eventType) || isBotTraffic) {
    return;
  }

  // 로그 레벨 결정
  const logLevel = EVENT_LOG_LEVEL_MAP[logData.eventType];

  // 타임스탬프 생성
  const timestamp = new Date().toISOString();

  // 메타데이터 구성 (타임스탬프 제외)
  const metadata = {
    environment: currentEnv,
    eventType: logData.eventType,
    ...(logData.errorCode && { errorCode: logData.errorCode }), // 에러코드 추가
    ...(logData.error && { error: logData.error }),
    ...(logData.performance && { performance: logData.performance }),
    ...(logData.userAgent && { userAgent: logData.userAgent }),
    ...(logData.serverInfo && { serverInfo: logData.serverInfo }),
    ...(logData.memory && { memory: logData.memory }),
    ...(logData.request && { request: logData.request }),
  };

  // 로깅 트레이스 구성
  const trace = logData.error?.stack
    ? `
Trace: ${logData.error.stack}`
    : "";

  // 타임스탬프 [로그레벨] 로깅 메시지 [로그트레이스] {메타데이터} 형태로 출력
  const logMessage = `${timestamp} [${logLevel.toUpperCase()}] ${logData.message}${trace}`;
  const logMetaData = {
    timestamp,
    logLevel: logLevel.toUpperCase(),
    logTrace: `${logData.message}${trace}`,
  };
  // 로그 레벨에 따른 출력
  switch (logLevel) {
    case LogLevel.ERROR:
      await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: ApiMethod.post,
        body: JSON.stringify({
          ...logMetaData,
          ...metadata,
        }),
      });
      console.error(logMessage, metadata);
      break;
    case LogLevel.WARN:
      await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: ApiMethod.post,
        body: JSON.stringify({
          ...logMetaData,
          ...metadata,
        }),
      });
      console.warn(logMessage, metadata);
      break;
    case LogLevel.INFO:
      await fetch(`${process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: ApiMethod.post,
        body: JSON.stringify({
          ...logMetaData,
          ...metadata,
        }),
      });
      console.info(logMessage, metadata);
      break;
    case LogLevel.DEBUG:
      console.debug(logMessage, metadata);
      break;
    default:
      console.log(logMessage, metadata);
  }
}
