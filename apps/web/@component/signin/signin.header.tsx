import Image from "next/image";

const SigninHeader = () => {
  return (
    <header className="px-4 md:px-6 py-4 flex items-center">
      <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
        <Image
          aria-hidden
          src="/arrow_left.svg"
          alt="go back icon"
          width={16}
          height={16}
        />
      </button>
      <div className="flex-1 text-center">
        <h1 className="text-lg font-semibold text-gray-900">로그인</h1>
      </div>
    </header>
  );
};
export default SigninHeader;
