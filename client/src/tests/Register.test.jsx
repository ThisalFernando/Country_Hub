import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Register from "../pages/Register.jsx";
import { BrowserRouter } from "react-router-dom";
import Swal from "sweetalert2";

// Mock registerUser API
jest.mock("../api/api", () => ({
  registerUser: jest.fn(),
}));

// Mock react-router-dom useNavigate
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock SweetAlert2
jest.mock("sweetalert2", () => ({
  fire: jest.fn(() =>
    Promise.resolve({
      isConfirmed: true,
    })
  ),
}));

describe("Register Component", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );
  });

  // Test the registration form elements
  it("renders registration form fields and button", () => {
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
  });

  // Test the successful registration
  it("submits form and navigates on success", async () => {
    const { registerUser } = require("../api/api");

    registerUser.mockResolvedValueOnce({ message: "Registered" });

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/address/i), { target: { value: "123 Street" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "Password123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(registerUser).toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Success!",
          text: "Registration successful!",
          icon: "success",
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });

  // Test the unsuccessful registration
  it("displays error alert on failed registration", async () => {
    const { registerUser } = require("../api/api");

    registerUser.mockRejectedValueOnce({
      response: { data: { error: "Email already in use" } },
    });

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: "Password123" } });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Error!",
          text: "Email already in use",
          icon: "error",
        })
      );
    });
  });
});
