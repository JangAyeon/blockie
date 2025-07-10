// "use client";

import SigninForm from "@component/signin/signin.form";
import SigninHeader from "@component/signin/signin.header";
import SignupLink from "@component/signin/signup.link";
import WelcomeHeader from "@component/signin/welcome.header";

const SigninPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white gap-16">
      <SigninHeader />

      <main className="flex-1 flex flex-col place-items-center px-4 md:px-6">
        <div className="flex flex-col gap-10 w-full max-w-md mx-auto">
          <WelcomeHeader />
          <div className="flex flex-col gap-4">
            <SigninForm />
            <SignupLink />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SigninPage;
