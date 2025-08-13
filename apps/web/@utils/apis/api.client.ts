import { ApiMethod } from "@constant/api.route";
import { logger } from "@utils/logger/logger";
import { EventName } from "@utils/logger/logger.types";

type ApiResponse<T> = {
  data: T;
  message?: string;
  status: number;
};

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = "/api") {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    try {
      // API 요청 시작 로깅
      await logger({
        eventType: EventName.FETCH,
        message: `API request started: ${options.method || ApiMethod.get} ${url}`,
        request: {
          method: options.method || ApiMethod.get,
          url: url,
          userAgent: navigator.userAgent,
          body: options.body?.toString(),
        },
      });
      const response = await fetch(url, {
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }
      const data = await response.json();

      return data;
    } catch (error) {
      // API 에러 로깅
      await logger({
        eventType: EventName.API_ERROR,
        message: `API request failed: ${options.method || ApiMethod.get} ${url}`,
        error: {
          name: error instanceof Error ? error.name : "UnknownError",
          message: error instanceof Error ? error.message : String(error),
          stack: error instanceof Error ? error.stack : undefined,
          source: url,
        },
        request: {
          method: options.method || ApiMethod.get,
          url: url,
          userAgent: navigator.userAgent,
          body: options.body?.toString(),
        },
      });

      throw error;
    }
  }

  get<T>(endpoint: string, params?: Record<string, any>) {
    const searchParams = params ? `?${new URLSearchParams(params)}` : "";
    return this.request<T>(`${endpoint}${searchParams}`, {
      method: ApiMethod.get,
    });
  }

  post<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: ApiMethod.post,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  patch<T>(endpoint: string, data?: any) {
    return this.request<T>(endpoint, {
      method: ApiMethod.patch,
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: ApiMethod.delete });
  }
}

export const apiClient = new ApiClient();
