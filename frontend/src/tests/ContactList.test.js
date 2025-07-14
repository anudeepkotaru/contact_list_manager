import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactList from "../components/ContactList";

const mockLocation = (search) => {
  delete window.location;
  window.location = { search };
};

describe("ContactList", () => {
  const mockOnDeleteContact = jest.fn();

  beforeEach(() => {
    mockOnDeleteContact.mockClear();
    mockLocation("");
  });

  test('renders "No contacts found" message when contacts array is empty and no search is active', () => {
    render(
      <ContactList
        contacts={[]}
        onDeleteContact={mockOnDeleteContact}
        searchTerm=""
      />,
    );
    expect(
      screen.getByText(/No contacts found\. Please add some contacts!/i),
    ).toBeInTheDocument();
    expect(screen.queryByRole("list")).not.toBeInTheDocument();
  });

  test('renders "No contacts found matching your search" message when contacts are empty and search is active', () => {
    mockLocation("?q=something");
    render(
      <ContactList
        contacts={[]}
        onDeleteContact={mockOnDeleteContact}
        searchTerm="something"
      />,
    );
    expect(
      screen.getByText(
        /No contacts found matching your search\. Please adjust your search criteria\./i,
      ),
    ).toBeInTheDocument();
  });

  test("renders a list of contacts when contacts array is not empty", () => {
    const contacts = [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ];
    render(
      <ContactList
        contacts={contacts}
        onDeleteContact={mockOnDeleteContact}
        searchTerm=""
      />,
    );

    expect(screen.getByText("Your Contacts")).toBeInTheDocument();

    const getContactTextMatcher = (text) => (content, element) => {
      return (
        element.textContent.replace(/\s+/g, " ").trim() ===
        text.replace(/\s+/g, " ").trim()
      );
    };

    expect(
      screen.getByText(getContactTextMatcher("Alice - alice@example.com")),
    ).toBeInTheDocument();
    expect(
      screen.getByText(getContactTextMatcher("Bob - bob@example.com")),
    ).toBeInTheDocument();

    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByRole("button", { name: /Delete/i })).toHaveLength(2);
  });

  test("calls onDeleteContact with correct ID when delete button is clicked", () => {
    const contacts = [{ id: 1, name: "Alice", email: "alice@example.com" }];
    render(
      <ContactList
        contacts={contacts}
        onDeleteContact={mockOnDeleteContact}
        searchTerm=""
      />,
    );

    const deleteButton = screen.getByRole("button", { name: /Delete/i });
    fireEvent.click(deleteButton);

    expect(mockOnDeleteContact).toHaveBeenCalledTimes(1);
    expect(mockOnDeleteContact).toHaveBeenCalledWith(1);
  });
});
