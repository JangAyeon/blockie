import { EventName, LogData, ServerInfo } from "@utils/logger/logger.types";

// Next.js 요구사항에 맞는 register 함수
export async function register(): Promise<void> {
  // Node.js 런타임에서만 실행
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("[Instrument] Server instrumentation started");

    // 동적 import로 logger 가져오기
    const { logger } = await import("@utils/logger/logger");

    // 1. 글로벌 에러 핸들러 설정
    setupGlobalErrorHandlers(logger);

    // 2. 성능 모니터링 설정
    setupPerformanceMonitoring(logger);

    // 3. 메모리 사용량 모니터링
    setupMemoryMonitoring(logger);

    // 환경별 추가 설정
    if (process.env.NODE_ENV === "development") {
      console.log(
        "[Instrument] Development mode - Additional debugging enabled"
      );

      // 개발 중 유용한 추가 모니터링
      process.on("exit", (code) => {
        console.log(`[Instrument] Process exiting with code: ${code}`);
      });
    }

    if (process.env.NODE_ENV === "production") {
      console.log("[Instrument] Production mode - Enhanced monitoring enabled");
      // 필요한 경우 프로덕션 모니터링 설정
      // setupProductionMonitoring(logger);
    }
  }
}

// 글로벌 에러 핸들러 설정
function setupGlobalErrorHandlers(
  logger: (logData: LogData) => Promise<void>
): void {
  // 처리되지 않은 예외 캐치
  process.on("uncaughtException", (error: Error) => {
    // console.error("[Instrument] Uncaught Exception:", error);

    logger({
      eventType: EventName.SERVER_ERROR,
      message: "Uncaught Exception",
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
        source: "uncaughtException",
      },
      serverInfo: getServerInfo(),
    });

    // 프로덕션에서는 프로세스 종료를 고려
    // process.exit(1);
  });

  // 처리되지 않은 Promise rejection 캐치
  process.on("unhandledRejection", (reason: any, promise: Promise<any>) => {
    // console.error(
    //   "[Instrument] Unhandled Rejection at:",
    //   promise,
    //   "reason:",
    //   reason
    // );

    logger({
      eventType: EventName.SERVER_ERROR,
      message: "Unhandled Promise Rejection",
      error: {
        name: reason instanceof Error ? reason.name : "UnhandledRejection",
        message: reason instanceof Error ? reason.message : String(reason),
        stack: reason instanceof Error ? reason.stack : undefined,
        source: "unhandledRejection",
      },
      serverInfo: getServerInfo(),
    });
  });

  // 프로세스 경고 캐치
  process.on("warning", (warning: Error) => {
    console.warn("[Instrument] Process Warning:", warning);

    logger({
      eventType: EventName.SERVER_WARNING,
      message: warning.message,
      error: {
        name: warning.name,
        message: warning.message,
        stack: warning.stack,
        source: "processWarning",
      },
      serverInfo: getServerInfo(),
    });
  });
}

// 성능 모니터링 설정
async function setupPerformanceMonitoring(
  logger: (logData: LogData) => Promise<void>
): Promise<void> {
  // Node.js 성능 API 사용 (동적 import)
  const { PerformanceObserver } = await import("perf_hooks");

  // HTTP 요청 성능 모니터링
  const httpObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "http") {
        logger({
          eventType: EventName.PERFORMANCE,
          message: `HTTP ${entry.name}`,
          performance: {
            name: entry.name,
            duration: entry.duration.toString(),
            startTime: entry.startTime.toString(),
            entryType: entry.entryType,
          },
          serverInfo: getServerInfo(),
        });
      }
    }
  });

  httpObserver.observe({ entryTypes: ["http"] });

  // 이벤트 루프 지연 모니터링
  setInterval(() => {
    const start = process.hrtime.bigint();
    setImmediate(() => {
      const delay = Number(process.hrtime.bigint() - start) / 1000000; // ms로 변환

      if (delay > 100) {
        // 100ms 이상 지연 시 로깅
        logger({
          eventType: EventName.PERFORMANCE,
          message: "Event loop delay detected",
          performance: {
            eventLoopDelay: delay,
            type: "event_loop_delay",
          },
          serverInfo: getServerInfo(),
        });
      }
    });
  }, 5000); // 5초마다 체크
}

// 메모리 모니터링 설정
function setupMemoryMonitoring(
  logger: (logData: LogData) => Promise<void>
): void {
  // 메모리 사용량을 주기적으로 체크
  setInterval(() => {
    const memUsage = process.memoryUsage();
    const heapUsedMB =
      Math.round((memUsage.heapUsed / 1024 / 1024) * 100) / 100;
    const heapTotalMB =
      Math.round((memUsage.heapTotal / 1024 / 1024) * 100) / 100;

    // 메모리 사용량이 임계값을 넘으면 로깅
    if (heapUsedMB > 500) {
      // 500MB 임계값
      logger({
        eventType: EventName.MEMORY_WARNING,
        message: `High memory usage: ${heapUsedMB}MB`,
        memory: {
          heapUsed: heapUsedMB,
          heapTotal: heapTotalMB,
          external: Math.round((memUsage.external / 1024 / 1024) * 100) / 100,
          rss: Math.round((memUsage.rss / 1024 / 1024) * 100) / 100,
        },
        serverInfo: getServerInfo(),
      });
    }
  }, 30000); // 30초마다 체크
}

// 서버 정보 가져오기
function getServerInfo(): ServerInfo {
  return {
    nodeVersion: process.version,
    platform: process.platform as NodeJS.Platform,
    arch: process.arch as NodeJS.Architecture,
    pid: process.pid,
    uptime: process.uptime(),
    environment: (process.env.NODE_ENV || "development") as
      | "development"
      | "production"
      | "test",
    timestamp: new Date().toISOString(),
    memoryUsage: process.memoryUsage(),
    cpuUsage: process.cpuUsage(),
  };
}
