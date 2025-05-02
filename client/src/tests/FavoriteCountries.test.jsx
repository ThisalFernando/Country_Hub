import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import FavoriteCountries from "../components/FavoriteCountries";
import "@testing-library/jest-dom";

// Mocking localStorage
beforeAll(() => {
  Storage.prototype.getItem = jest.fn(() => "fake-token"); // Mock token
});

beforeEach(() => {
  jest.clearAllMocks(); 
});

test("displays loading message while fetching data", () => {
  render(
    <Router>
      <FavoriteCountries />
    </Router>
  );
  expect(screen.getByText(/Loading your favorites countries.../i)).toBeInTheDocument();
});

// Test no  favorite countries is displayed when no favorite countries
test("displays no favorites message when no countries are added", async () => {
  global.fetch = jest.fn().mockResolvedValueOnce({
    json: jest.fn().mockResolvedValue([]),
  });

  render(
    <Router>
      <FavoriteCountries />
    </Router>
  );

  await waitFor(() => screen.getByText(/No favorite countries added yet!/i));
  expect(screen.getByText(/No favorite countries added yet!/i)).toBeInTheDocument();
});

// Test the favorite countries are displayed
test("displays favorite countries correctly", async () => {
  const mockCountryDetails = [
    {
      cca2: "US",
      cca3: "USA",
      name: { common: "United States", official: "United States of America" },
      capital: ["Washington, D.C."],
      flags: { svg: "https://restcountries.com/v3.1/flags/us.svg" },
    },
    {
      cca2: "CA",
      cca3: "CAN",
      name: { common: "Canada", official: "Canada" },
      capital: ["Ottawa"],
      flags: { svg: "https://restcountries.com/v3.1/flags/ca.svg" },
    },
  ];

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCountryDetails),
    });

  render(
    <Router>
      <FavoriteCountries />
    </Router>
  );

  await waitFor(() => screen.getByText(/United States/i));
  expect(screen.getByText(/United States/i)).toBeInTheDocument();
  expect(screen.getByText(/Canada/i)).toBeInTheDocument();
});

// Test that the login message is displayed when the user is not logged
test("displays login message if token is not available", () => {
  localStorage.removeItem("token");

  render(
    <Router>
      <FavoriteCountries />
    </Router>
  );
  expect(screen.getByText(/Please log in to view favorite countries./i)).toBeInTheDocument();
});

// Test that the favorite countries view the country details
test("handles click on favorite country", async () => {
  const mockCountryDetails = [
    {
      cca2: "US",
      cca3: "USA",
      name: { common: "United States", official: "United States of America" },
      capital: ["Washington, D.C."],
      flags: { svg: "https://restcountries.com/v3.1/flags/us.svg" },
    },
  ];

  global.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue(mockCountryDetails),
    });

  render(
    <Router>
      <FavoriteCountries />
    </Router>
  );

  await waitFor(() => screen.getByText(/United States/i));
  const countryLink = screen.getByText(/United States/i).closest("a");
  expect(countryLink).toHaveAttribute("href", "/country/USA");
});

// Test that the social media links are displayed
test("displays social media links correctly", async () => {
  render(
    <Router>
      <FavoriteCountries />
    </Router>
  );

  await waitFor(() => screen.getByText(/Follow us on/i));
  expect(screen.getByAltText("facebook logo")).toBeInTheDocument();
  expect(screen.getByAltText("twitter logo")).toBeInTheDocument();
  expect(screen.getByAltText("instagram logo")).toBeInTheDocument();
});
