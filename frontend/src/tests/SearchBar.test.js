import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchBar from "../components/SearchBar";

describe("SearchBar", () => {
  const mockOnSearch = jest.fn();

  beforeEach(() => {
    mockOnSearch.mockClear();
  });

  test("renders the search input", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    expect(
      screen.getByPlaceholderText(/Search by name or email/i),
    ).toBeInTheDocument();
  });

  test("calls onSearch with the correct value when input changes", () => {
    render(<SearchBar onSearch={mockOnSearch} />);
    const searchInput = screen.getByPlaceholderText(/Search by name or email/i);

    fireEvent.change(searchInput, { target: { value: "test query" } });
    expect(searchInput).toHaveValue("test query");
    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("test query");

    fireEvent.change(searchInput, { target: { value: "another" } });
    expect(searchInput).toHaveValue("another");
    expect(mockOnSearch).toHaveBeenCalledTimes(2);
    expect(mockOnSearch).toHaveBeenCalledWith("another");
  });
});
