"use client";

import SignupForm from "@component/features/signup/signup.form";
import SignupHeader from "@component/common/auth.header";
import WelcomeHeader from "@component/common/welcome.header";
import AuthSwitchLink from "@component/common/authSwitch.link";

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
