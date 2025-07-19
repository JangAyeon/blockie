import { AuthContent, AuthTypeProps } from "@type/auth";

export const AUTH_DATA: Record<AuthTypeProps["type"], AuthContent> = {
  signin: {
    title: "계정이 없으신가요?",
    togoPageName: "회원가입",
    togoUrl: "/signup",
    headerTitle: "로그인",
    welcome: {
      title: "블로키와 함께 시작해요!",
      subTitle: "재미있는 소비 관리의 첫 걸음",
    },
  },
  signup: {
    title: " 이미 계정이 있으신가요?",
    togoPageName: " 로그인",
    togoUrl: "/signin",
    headerTitle: "회원가입",
    welcome: {
      title: "다시 만나서 반가워요!",
      subTitle: "로그인하고 블록을 쌓아볼까요?",
    },
  },
};
