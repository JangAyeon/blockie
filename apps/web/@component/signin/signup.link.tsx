"use client";
import { useRouter } from "next/navigation";

const SignupLink = () => {
  const router = useRouter();

  return (
    <div className="text-center">
      <p className="text-gray-600">
        계정이 없으신가요?{" "}
        <button
          onClick={() => router.push("/signup")}
          className="text-gray-900 cursor-pointer font-medium hover:text-gray-700 transition-colors"
        >
          회원가입
        </button>
      </p>
    </div>
  );
};

export default SignupLink;
