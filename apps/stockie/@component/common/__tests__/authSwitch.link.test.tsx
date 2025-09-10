import { render, screen } from "@testing-library/react";
import AuthSwitchLink from "../authSwitch.link";
import userEvent from "@testing-library/user-event";
import { AUTH_DATA } from "@constant/auth.text";

describe("AuthSwitchLink 컴포넌트", () => {
  test("signin 타입일 때 올바른 텍스트가 표시된다", () => {
    // 🔵 Arrange
    const type = "signin";

    // 🟢 Act
    render(<AuthSwitchLink type={type} />);

    // 🔴 Assert
    expect(screen.getByText("계정이 없으신가요?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "회원가입" })
    ).toBeInTheDocument();
  });

  test("signup 타입일 때 올바른 텍스트가 표시된다", () => {
    // 🔵 Arrange
    const type = "signup";

    // 🟢 Act
    render(<AuthSwitchLink type={type} />);

    // 🔴 Assert
    expect(screen.getByText("이미 계정이 있으신가요?")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
  });

  test("버튼 클릭 시 컴포넌트가 정상 동작한다 (에러 없이)", async () => {
    // 🔵 Arrange
    const user = userEvent.setup();

    // 🟢 Act
    render(<AuthSwitchLink type="signin" />);
    const button = screen.getByRole("button", { name: "회원가입" });

    // 버튼 클릭해도 에러가 발생하지 않는지 확인
    await user.click(button);

    // 🔴 Assert
    // 에러가 없으면 테스트 통과!
    // (실제 navigation은 모킹되어서 아무것도 하지 않음)
    expect(button).toBeInTheDocument();
  });

  test("CSS 클래스가 올바르게 적용된다", () => {
    // 🔵 Arrange & 🟢 Act
    render(<AuthSwitchLink type="signin" />);

    // 🔴 Assert
    const button = screen.getByRole("button", { name: "회원가입" });
    expect(button).toHaveClass("text-neutral-black");
    expect(button).toHaveClass("cursor-pointer");
    expect(button).toHaveClass("font-medium");

    const container = screen.getByText("계정이 없으신가요?").closest("div");
    expect(container).toHaveClass("text-neutral-dark-gray");
    expect(container).toHaveClass("text-body-2");
  });

  test("컴포넌트가 올바른 구조로 렌더링된다", () => {
    // 🔵 Arrange & 🟢 Act
    const type = "signin";
    render(<AuthSwitchLink type={type} />);

    // 🔴 Assert - DOM 구조 확인
    const { title, togoPageName, togoUrl } = AUTH_DATA[type];
    const textElement = screen.getByText(title);
    const buttonElement = screen.getByRole("button", { name: togoPageName });

    expect(textElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
    expect(textElement).toBe(buttonElement.parentElement); //  텍스트와 버튼이 같은 부모 div 안에 있는지 확인
  });
});
