// "use client";

import WelcomeHeader from "@component/common/welcome.header";
import SigninForm from "@component/signin/signin.form";

import AuthSwitchLink from "@component/common/authSwitch.link";
import AuthHeader from "@component/common/auth.header";

const SigninPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white gap-16">
      <AuthHeader type="signin" />

      <main className="flex-1 flex flex-col place-items-center px-4 md:px-6">
        <div className="flex flex-col gap-10 w-full max-w-md mx-auto">
          <WelcomeHeader type="signin" />
          <div className="flex flex-col gap-4">
            <SigninForm />
            <AuthSwitchLink type="signin" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SigninPage;
