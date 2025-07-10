// 이메일 기억하기 관련 localStorage 키들
export const STORAGE_KEYS = {
  REMEMBER_EMAIL: "rememberEmail",
  SAVED_EMAIL: "savedEmail",
  AUTH_TOKEN: "authToken",
} as const;

// localStorage 관리 함수들
export const emailStorage = {
  // 이메일 기억하기 설정 저장
  save: (email: string) => {
    localStorage.setItem(STORAGE_KEYS.REMEMBER_EMAIL, "true");
    localStorage.setItem(STORAGE_KEYS.SAVED_EMAIL, email);
  },

  // 이메일 기억하기 설정 제거
  remove: () => {
    localStorage.removeItem(STORAGE_KEYS.REMEMBER_EMAIL);
    localStorage.removeItem(STORAGE_KEYS.SAVED_EMAIL);
  },

  // 저장된 이메일 정보 가져오기
  get: () => {
    const rememberEmail = localStorage.getItem(STORAGE_KEYS.REMEMBER_EMAIL);
    const savedEmail = localStorage.getItem(STORAGE_KEYS.SAVED_EMAIL);

    return {
      isEnabled: rememberEmail === "true",
      email: savedEmail || "",
    };
  },
};

// 폼 검증 함수들
export const validateForm = {
  email: (email: string): string => {
    if (!email) return "이메일을 입력해주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return "올바른 이메일 형식이 아닙니다.";
    }
    return "";
  },

  password: (password: string): string => {
    if (!password) return "비밀번호를 입력해주세요.";
    if (password.length < 6) return "비밀번호는 최소 6자 이상이어야 합니다.";
    return "";
  },
};

// API 호출 함수들
export const authAPI = {
  signin: async (email: string, password: string) => {
    // 실제 API 호출 로직
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("로그인에 실패했습니다.");
    }

    return response.json();
  },

  validateToken: async (token: string) => {
    const response = await fetch("/api/auth/validate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response.ok;
  },
};
