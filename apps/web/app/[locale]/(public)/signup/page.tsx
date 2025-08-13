"use client";

import SignupForm from "@component/features/signup/signup.form";
import SignupHeader from "@component/common/auth.header";
import WelcomeHeader from "@component/common/welcome.header";
import AuthSwitchLink from "@component/common/authSwitch.link";

// import { useSignUp } from "@hook/useAuth";
// import { useState } from "react";

// export default function SignUpPage() {
//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const { mutate: signUp, isPending } = useSignUp();

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     signUp(form);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-4 max-w-md mx-auto mt-10"
//     >
//       <input
//         name="email"
//         placeholder="이메일"
//         onChange={handleChange}
//         required
//       />
//       <input
//         name="password"
//         type="password"
//         placeholder="비밀번호"
//         onChange={handleChange}
//         required
//       />

//       <button type="submit" disabled={isPending}>
//         {isPending ? "회원가입 중..." : "회원가입"}
//       </button>
//     </form>
//   );
// }

// import { colors } from "./constants/colors";
// // import { useSignupForm } from "./hooks/useSignupForm";
// // import SignupHeader from "./components/SignupHeader";
// import ProgressBar from "./components/ProgressBar";
// // import AccountStep from "./components/steps/AccountStep";
// import ProfileStep from "./components/steps/ProfileStep";
// import BudgetStep from "./components/steps/BudgetStep";

const BlockieSignup: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white gap-16">
      <SignupHeader type="signup" />
      {/* <ProgressBar step={step} totalSteps={totalSteps} /> */}

      <main className="flex-1 flex flex-col place-items-center px-4 md:px-6">
        <div className="flex flex-col gap-10 w-full max-w-md mx-auto">
          <WelcomeHeader type="signup" />
          <div className="flex flex-col gap-4">
            <SignupForm />
            <AuthSwitchLink type="signup" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default BlockieSignup;
