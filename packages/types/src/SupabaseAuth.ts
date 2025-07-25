// auth.types.ts
export interface SupabaseUser {
  id: string;
  email: string;
  user_metadata: SupabaseUsermetadata;
  [key: string]: any; // 필요한 필드만 정리하거나 전체 허용
}

export interface SupabaseUsermetadata {
  email: string;
  email_verified: boolean;
  phone_verified: boolean;
  sub: string; // UUID
}

export interface SupabaseSignUpResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: SupabaseUser;
}

export interface SupabaseSignInResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  user: SupabaseUser;
}
export interface SupabaseSignInRequest {
  email: SupabaseUser["email"];
  password: string;
}

export interface SupabaseSignUpRequest {
  email: SupabaseUser["email"];
  password: string;
}
export interface AuthUser {
  id: SupabaseUser["id"];
  email: SupabaseUser["email"];
  name?: string;
  phone?: string;
  createdAt: string;
}
