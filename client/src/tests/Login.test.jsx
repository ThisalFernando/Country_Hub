import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "../pages/Login.jsx";
import { useNavigate } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { loginUser } from "../api/api";
import Swal from "sweetalert2";

// Mock API call
jest.mock("../api/api", () => ({
  loginUser: jest.fn(),
}));

// Mock SweetAlert2
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

// Mock useNavigate
jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");
  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

const mockNavigate = jest.fn();

beforeEach(() => {
  useNavigate.mockReturnValue(mockNavigate);
  jest.clearAllMocks();
});

const renderLogin = () =>
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

describe("Login Page", () => {
  test("renders form elements", () => {
    renderLogin();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  // Test for successful login
  test("successful login calls loginUser and navigates", async () => {
    loginUser.mockResolvedValue({
      data: { token: "mock-token" },
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
      target: { value: "thisalf@gmail.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: "Thisal@123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith({
        email: "thisalf@gmail.com",
        password: "Thisal@123",
      });

      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({ icon: "success" })
      );

      expect(mockNavigate).toHaveBeenCalledWith("/countries");
    });
  });

  // Test for unsuccessful login
  test("failed login shows error alert", async () => {
    loginUser.mockRejectedValue({
      response: { data: { error: "Invalid credentials" } },
    });

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/enter email/i), {
      target: { value: "wrong@email.com" },
    });

    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "error",
          text: "Invalid credentials",
        })
      );
    });
  });
});

