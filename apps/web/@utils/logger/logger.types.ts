export enum EventName {
  RUNTIME_ERROR = "runtime_error",
  API_ERROR = "api_error",
  NETWORK_ERROR = "network_error",
  SERVER_ERROR = "server_error",
  SERVER_WARNING = "server_warning",
  MEMORY_WARNING = "memory_warning",
  PERFORMANCE = "performance",
  MIDDLEWARE_REQUEST = "middleware-request",
  FETCH = "fetch",
  NOT_FOUND = "not_found",
  GLOBAL_ERROR = "global_error",
  BAD_REQUEST = "bad_request",
}

export type EventType = EventName;

export type ServerInfo = {
  nodeVersion: string;
  platform: NodeJS.Platform;
  arch: NodeJS.Architecture;
  pid: number;
  uptime: number;
  environment: "development" | "production" | "test";
  timestamp: string;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
};

export type PerformanceInfo = {
  name?: string;
  eventLoopDelay?: number;
  type?: string;
  duration?: string;
  startTime?: string;
  entryType?: string;
};

export type MemoryInfo = {
  heapUsed: number;
  heapTotal: number;
  external: number;
  rss: number;
};

export type MiddlewareRequestInfo = {
  method?: string;
  url?: string;
  userAgent?: string | null;
  responseTime?: number;
  body?: string;
};

export interface LogData {
  eventType: EventType;
  message: string;
  errorCode?: number;
  error?: {
    name?: string;
    message?: string;
    stack?: string;
    source?: string;
  };
  performance?: PerformanceInfo;
  userAgent?: string;
  serverInfo?: ServerInfo;
  memory?: MemoryInfo;
  request?: MiddlewareRequestInfo;
}

export enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}
