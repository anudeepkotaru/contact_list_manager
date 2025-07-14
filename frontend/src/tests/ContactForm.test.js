import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactForm from "../components/ContactForm";

describe("ContactForm", () => {
  const mockOnAddContact = jest.fn();
  const mockShowNotification = jest.fn();

  beforeEach(() => {
    mockOnAddContact.mockClear();
    mockShowNotification.mockClear();
  });

  test("renders the form with name and email inputs and an add button", () => {
    render(
      <ContactForm
        onAddContact={mockOnAddContact}
        showNotification={mockShowNotification}
      />,
    );

    expect(screen.getByPlaceholderText(/Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Contact/i }),
    ).toBeInTheDocument();
  });

  test("updates input values when typed into", () => {
    render(
      <ContactForm
        onAddContact={mockOnAddContact}
        showNotification={mockShowNotification}
      />,
    );

    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);

    fireEvent.change(nameInput, { target: { value: "Jane Doe" } });
    fireEvent.change(emailInput, { target: { value: "jane@example.com" } });

    expect(nameInput).toHaveValue("Jane Doe");
    expect(emailInput).toHaveValue("jane@example.com");
  });

  test("calls onAddContact and clears form on valid submission", () => {
    render(
      <ContactForm
        onAddContact={mockOnAddContact}
        showNotification={mockShowNotification}
      />,
    );

    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const addButton = screen.getByRole("button", { name: /Add Contact/i });

    fireEvent.change(nameInput, { target: { value: "Valid Name" } });
    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.click(addButton);

    expect(mockOnAddContact).toHaveBeenCalledTimes(1);
    expect(mockOnAddContact).toHaveBeenCalledWith({
      name: "Valid Name",
      email: "valid@example.com",
    });
    expect(nameInput).toHaveValue("");
    expect(emailInput).toHaveValue("");
  });

  test("shows error notification for empty name on submission", () => {
    render(
      <ContactForm
        onAddContact={mockOnAddContact}
        showNotification={mockShowNotification}
      />,
    );

    const emailInput = screen.getByPlaceholderText(/Email/i);
    const addButton = screen.getByRole("button", { name: /Add Contact/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.click(addButton);

    expect(mockOnAddContact).not.toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledTimes(1);
    expect(mockShowNotification).toHaveBeenCalledWith(
      "Name and Email cannot be empty.",
      "error",
    );
  });

  test("shows error notification for empty email on submission", () => {
    render(
      <ContactForm
        onAddContact={mockOnAddContact}
        showNotification={mockShowNotification}
      />,
    );

    const nameInput = screen.getByPlaceholderText(/Name/i);
    const addButton = screen.getByRole("button", { name: /Add Contact/i });

    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.click(addButton);

    expect(mockOnAddContact).not.toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledTimes(1);
    expect(mockShowNotification).toHaveBeenCalledWith(
      "Name and Email cannot be empty.",
      "error",
    );
  });

  test("shows error notification for invalid email format on submission", () => {
    render(
      <ContactForm
        onAddContact={mockOnAddContact}
        showNotification={mockShowNotification}
      />,
    );

    const nameInput = screen.getByPlaceholderText(/Name/i);
    const emailInput = screen.getByPlaceholderText(/Email/i);
    const addButton = screen.getByRole("button", { name: /Add Contact/i });

    fireEvent.change(nameInput, { target: { value: "Test Name" } });
    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    fireEvent.click(addButton);

    expect(mockOnAddContact).not.toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledTimes(1);
    expect(mockShowNotification).toHaveBeenCalledWith(
      "Please enter a valid email address.",
      "error",
    );
  });
});
