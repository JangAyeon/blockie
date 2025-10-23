// auth.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { SupabaseSignUpResponse, SupabaseSignInResponse } from '@repo/types';

@Injectable()
export class AuthService {
  private supabaseUrl = process.env.SUPABASE_URL;
  private supabaseKey = process.env.SUPABASE_ANON_KEY;

  constructor(private readonly httpService: HttpService) {}

  async signUp(
    email: string,
    password: string,
  ): Promise<SupabaseSignUpResponse> {
    const url = `${this.supabaseUrl}/auth/v1/signup`;

    try {
      const response =
        await this.httpService.axiosRef.post<SupabaseSignUpResponse>(
          url,
          { email, password },
          {
            headers: {
              apikey: this.supabaseKey,
              Authorization: `Bearer ${this.supabaseKey}`,
              'Content-Type': 'application/json',
            },
          },
        );
      return response.data;
    } catch (error) {
      // 예외 발생 시 NestJS 예외로 변환
      throw new InternalServerErrorException(
        `Supabase SignUp 실패 ${email}, ${password}, ${url}, ${error}`,
      );
    }
  }

  async signIn(
    email: string,
    password: string,
  ): Promise<SupabaseSignInResponse> {
    const url = `${this.supabaseUrl}/auth/v1/token?grant_type=password`;

    try {
      const response =
        await this.httpService.axiosRef.post<SupabaseSignInResponse>(
          url,
          { email, password },
          {
            headers: {
              apikey: this.supabaseKey,
              Authorization: `Bearer ${this.supabaseKey}`,
              'Content-Type': 'application/json',
            },
          },
        );
      return response.data;
    } catch (error) {
      throw new InternalServerErrorException(
        `Supabase SignIn 실패 ${email}, ${password}, ${error}, ${url}, apikey: ${this.supabaseKey},  Authorization: Bearer ${this.supabaseKey}`,
      );
    }
  }
  // auth.service.ts
  async signOut(accessToken: string): Promise<void> {
    const url = `${this.supabaseUrl}/auth/v1/logout`;

    try {
      await this.httpService.axiosRef.post(
        url,
        {},
        {
          headers: {
            Authorization: `${accessToken}`,
            apikey: this.supabaseKey,
          },
        },
      );
    } catch (error) {
      throw new InternalServerErrorException(
        `Supabase Logout 실패: ${error}, ${url}`,
      );
    }
  }
}
