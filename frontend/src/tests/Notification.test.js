import React from "react";
import { render, screen } from "@testing-library/react";
import Notification from "../components/Notification";

describe("Notification", () => {
  test("does not render when message is null", () => {
    const { container } = render(<Notification message={null} type="info" />);
    expect(container).toBeEmptyDOMElement();
  });

  test("renders message and applies info class", () => {
    render(<Notification message="Info message" type="info" />);
    const notificationElement = screen.getByText("Info message");
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveClass("notification");
    expect(notificationElement).toHaveClass("info");
  });

  test("renders message and applies success class", () => {
    render(<Notification message="Success!" type="success" />);
    const notificationElement = screen.getByText("Success!");
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveClass("notification");
    expect(notificationElement).toHaveClass("success");
  });

  test("renders message and applies warning class", () => {
    render(<Notification message="Warning!" type="warning" />);
    const notificationElement = screen.getByText("Warning!");
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveClass("notification");
    expect(notificationElement).toHaveClass("warning");
  });

  test("renders message and applies error class", () => {
    render(<Notification message="Error!" type="error" />);
    const notificationElement = screen.getByText("Error!");
    expect(notificationElement).toBeInTheDocument();
    expect(notificationElement).toHaveClass("notification");
    expect(notificationElement).toHaveClass("error");
  });
});
