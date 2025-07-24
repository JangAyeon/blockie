"use client";
import { AUTH_DATA } from "@constant/auth.text";
import { AuthTypeProps } from "@type/auth";
import { useRouter } from "next/navigation";

const AuthSwitchLink: React.FC<AuthTypeProps> = ({ type }) => {
  const router = useRouter();
  const { title, togoPageName, togoUrl } = AUTH_DATA[type];

  return (
    <div className="text-center">
      <div className="text-neutral-dark-gray text-body-2">
        {title}{" "}
        <button
          onClick={() => router.push(togoUrl)}
          className="text-neutral-black cursor-pointer font-medium hover:text-neutral-dark-gray transition-colors"
        >
          {togoPageName}
        </button>
      </div>
    </div>
  );
};

export default AuthSwitchLink;
