import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ConfirmDialog from "../components/ConfirmDialog";

describe("ConfirmDialog", () => {
  const mockOnConfirm = jest.fn();
  const mockOnCancel = jest.fn();

  beforeEach(() => {
    mockOnConfirm.mockClear();
    mockOnCancel.mockClear();
  });

  test("renders the dialog with the correct message and buttons", () => {
    const message = "Are you sure?";
    render(
      <ConfirmDialog
        message={message}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Cancel/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Delete/i })).toBeInTheDocument();
  });

  test("calls onConfirm when the Delete button is clicked", () => {
    const message = "Confirm deletion?";
    render(
      <ConfirmDialog
        message={message}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Delete/i }));
    expect(mockOnConfirm).toHaveBeenCalledTimes(1);
    expect(mockOnCancel).not.toHaveBeenCalled();
  });

  test("calls onCancel when the Cancel button is clicked", () => {
    const message = "Discard changes?";
    render(
      <ConfirmDialog
        message={message}
        onConfirm={mockOnConfirm}
        onCancel={mockOnCancel}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /Cancel/i }));
    expect(mockOnCancel).toHaveBeenCalledTimes(1);
    expect(mockOnConfirm).not.toHaveBeenCalled();
  });
});
