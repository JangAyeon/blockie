import { formatWithCurrencySymbol } from "../formatter";

// unit Test: 유틸 함수 로직 테스트
describe("formatWithCurrencySymbol 함수", () => {
  test("숫자를 올바른 통화 형식(₩)으로 포맷한다", () => {
    // Arrange
    const testAmount = 15000;

    // Act
    const result = formatWithCurrencySymbol(testAmount);

    // Assert
    expect(result).toBe("₩15,000");
  });

  test("큰 숫자도 올바르게 포맷한다", () => {
    // Arrange
    const testAmount = 1500000;

    // Act
    const result = formatWithCurrencySymbol(testAmount);

    // Assert
    expect(result).toBe("₩1,500,000");
  });

  test("0을 올바르게 처리한다", () => {
    // Arrange
    const testAmount = 0;

    // Act
    const result = formatWithCurrencySymbol(testAmount);

    // Assert
    expect(result).toBe("₩0");
  });
});
