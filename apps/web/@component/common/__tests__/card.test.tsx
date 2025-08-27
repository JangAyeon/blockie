import { render, screen } from "@testing-library/react";
import Card from "../card";

// unit Test: 컴포넌트 렌더링 테스트
describe("Card 컴포넌트", () => {
  test("children이 올바르게 렌더링된다", () => {
    // Arrange: 테스트에 필요한 데이터와 컴포넌트 준비
    const testContent = "테스트 카드 내용";

    // Act: 실제 동작 실행
    render(
      <Card>
        <p>{testContent}</p>
      </Card>
    );

    // Assert: 결과 검증
    expect(screen.getByText(testContent)).toBeInTheDocument();
  });
});
