// tests/hooks/useToggleSwitch.test.ts
import { renderHook, act } from "@testing-library/react";
import useToggleSwitch from "../../src/hooks/useToggleSwitch";
import { vi } from "vitest";

describe("useToggleSwitch Hook", () => {
  test("should initialize with false", () => {
    const onToggleMock = vi.fn();
    const { result } = renderHook(() => useToggleSwitch(onToggleMock));

    expect(result.current.isSolution).toBe(false);
  });

  test("should toggle state and call onToggle", () => {
    const onToggleMock = vi.fn();
    const { result } = renderHook(() => useToggleSwitch(onToggleMock));

    act(() => {
      result.current.handleToggle();
    });

    expect(result.current.isSolution).toBe(true);
    expect(onToggleMock).toHaveBeenCalledWith(true);
  });
});
