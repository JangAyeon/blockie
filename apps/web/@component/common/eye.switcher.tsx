import Image from "next/image";

const EyeIconSwitcher = ({ show }: { show: boolean }) => {
  return show ? (
    <Image
      src="/auth/eye-visible.svg"
      alt="eye visible icon"
      width={24}
      height={24}
    />
  ) : (
    <Image
      src="/auth/eye-invisible.svg"
      alt="eye invisible icon"
      width={24}
      height={24}
    />
  );
};

export default EyeIconSwitcher;
