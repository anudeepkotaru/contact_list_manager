import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "../src/App";
global.fetch = jest.fn();

describe("App", () => {
  beforeEach(() => {
    global.fetch.mockClear();

    global.fetch.mockImplementation((url) => {
      if (url.includes("/contacts")) {
        return Promise.resolve({
          ok: true,
          status: 200,
          json: () =>
            Promise.resolve({
              contacts: [],
              total_contacts: 0,
              total_pages: 1,
              current_page: 1,
              per_page: 10,
              has_next: false,
              has_prev: false,
            }),
        });
      }
      return Promise.reject(new Error("Unmocked fetch call: " + url));
    });
  });

  test("renders the main application title and initial empty state after loading", async () => {
    render(<App />);

    expect(screen.getByText(/Contact List Manager/i)).toBeInTheDocument();
    await waitFor(
      () => {
        expect(
          screen.queryByText(/Loading contacts\.\.\./i),
        ).not.toBeInTheDocument();
        expect(
          screen.getByText(/No contacts found\. Please add some contacts!/i),
        ).toBeInTheDocument();
      },
      { timeout: 3000 },
    );
    expect(
      screen.queryByText(/Failed to load contacts\. Please try again\./i),
    ).not.toBeInTheDocument();
  });
});
