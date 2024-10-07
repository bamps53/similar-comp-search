// tests/components/ToggleSwitch.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import ToggleSwitch from "../../src/components/ToggleSwitch";
import { vi } from "vitest";

describe("ToggleSwitch Component", () => {
  test("should render with initial state", () => {
    const onToggleMock = vi.fn();
    render(<ToggleSwitch onToggle={onToggleMock} />);

    const toggle = screen.getByRole("checkbox", {
      name: "検索タイプ切り替えスイッチ",
    });

    expect(toggle).not.toBeChecked();
  });

  test("should toggle state on click", () => {
    const onToggleMock = vi.fn();
    render(<ToggleSwitch onToggle={onToggleMock} />);

    const toggle = screen.getByRole("checkbox", {
      name: "検索タイプ切り替えスイッチ",
    });

    fireEvent.click(toggle);

    expect(toggle).toBeChecked();
    expect(onToggleMock).toHaveBeenCalledWith(true);
  });
});
