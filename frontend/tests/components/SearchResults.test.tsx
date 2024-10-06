// tests/components/SearchResults.test.tsx
import { render, screen } from "@testing-library/react";
import SearchResults from "../../src/components/SearchResults";
import { ResultItem } from "../../src/pages/Home";

describe("SearchResults Component", () => {
  const mockResults: ResultItem[] = [
    { id: 1, title: "First Competition", domain: "NLP" },
    { id: 2, title: "Second Competition", domain: "Computer Vision" },
  ];

  test("should display spinner when loading", () => {
    render(<SearchResults results={[]} isLoading={true} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("should display '結果が見つかりませんでした' when results are empty", () => {
    render(<SearchResults results={[]} isLoading={false} />);

    expect(screen.getByText("結果が見つかりませんでした")).toBeInTheDocument();
  });

  test("should render results when provided", () => {
    render(<SearchResults results={mockResults} isLoading={false} />);

    expect(screen.getByText("First Competition")).toBeInTheDocument();
    expect(screen.getByText("Second Competition")).toBeInTheDocument();
  });
});
