"use client";

import React, { useState } from "react";
import {
  Button,
  PlusIcon,
  LoadingIcon,
  DownloadIcon,
  SettingsIcon,
  TrashIcon,
  HeartIcon,
} from "@repo/ui";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleAsyncAction = async () => {
    setIsLoading(true);
    // 시뮬레이션된 비동기 작업
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-off-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-dark mb-8">
          Blockie Button 컴포넌트 예시
        </h1>

        {/* 기본 variant들 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">
            버튼 Variants
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Success</Button>
            <Button variant="warning">Warning</Button>
            <Button variant="error">Error</Button>
          </div>
        </section>

        {/* 사이즈 변형 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">버튼 사이즈</h2>
          <div className="flex flex-wrap items-end gap-4">
            <Button size="xs">Extra Small</Button>
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="xl">Extra Large</Button>
          </div>
        </section>

        {/* 아이콘과 함께 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">아이콘 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button leftIcon={<DownloadIcon className="w-4 h-4" />}>
              추가하기
            </Button>
            <Button
              variant="secondary"
              rightIcon={<SettingsIcon className="w-4 h-4" />}
            >
              다운로드
            </Button>
            <Button
              variant="outline"
              leftIcon={<TrashIcon className="w-4 h-4" />}
              rightIcon={<HeartIcon className="w-4 h-4" />}
            >
              HeartIcon 설정
            </Button>
          </div>
        </section>

        {/* 상태 버튼 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">상태 버튼</h2>
          <div className="flex flex-wrap gap-4">
            <Button disabled>비활성화</Button>
            <Button
              isLoading={isLoading}
              onClick={handleAsyncAction}
              variant="success"
            >
              {isLoading ? "처리중..." : "비동기 작업"}
            </Button>
            <Button
              variant="error"
              leftIcon={<LoadingIcon className="w-4 h-4" />}
            >
              삭제
            </Button>
          </div>
        </section>

        {/* 전체 너비 버튼 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">
            전체 너비 버튼
          </h2>
          <div className="space-y-3">
            <Button
              fullWidth
              size="lg"
              leftIcon={<HeartIcon className="w-5 h-5" />}
            >
              새 블록 만들기
            </Button>
            <Button
              fullWidth
              variant="outline"
              rightIcon={<HeartIcon className="w-4 h-4" />}
            >
              프로젝트 다운로드
            </Button>
          </div>
        </section>

        {/* 애니메이션 없는 버튼 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">
            애니메이션 제어
          </h2>
          <div className="flex gap-4">
            <Button animated={true}>애니메이션 있음</Button>
            <Button animated={false} variant="secondary">
              애니메이션 없음
            </Button>
          </div>
        </section>

        {/* 커스텀 아이콘 예시 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">
            커스텀 아이콘
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button
              leftIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              variant="warning"
            >
              번개
            </Button>
            <Button
              rightIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              }
              variant="outline"
            >
              전송
            </Button>
            <Button
              leftIcon={
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              variant="success"
            >
              완료
            </Button>
          </div>
        </section>

        {/* 다양한 크기의 아이콘 테스트 */}
        <section className="mb-8">
          <h2 className="text-xl font-semibold text-dark mb-4">
            아이콘 크기 자동 조정
          </h2>
          <div className="flex flex-wrap items-end gap-4">
            <Button size="xs" leftIcon={<PlusIcon />}>
              XS
            </Button>
            <Button size="sm" leftIcon={<PlusIcon />}>
              SM
            </Button>
            <Button size="md" leftIcon={<PlusIcon />}>
              MD
            </Button>
            <Button size="lg" leftIcon={<PlusIcon />}>
              LG
            </Button>
            <Button size="xl" leftIcon={<PlusIcon />}>
              XL
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
