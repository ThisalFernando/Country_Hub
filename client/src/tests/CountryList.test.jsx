import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import CountryList from "../components/CountryList";
import '@testing-library/jest-dom/extend-expect';

// Mocking fetch to avoid making real API calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        cca2: "US",
        cca3: "USA",
        name: { common: "United States of America" },
        flags: { svg: "https://flagcdn.com/us.svg" },
        capital: ["Washington, D.C."]
      },
      {
        cca2: "IN",
        cca3: "IND",
        name: { common: "India" },
        flags: { svg: "https://flagcdn.com/in.svg" },
        capital: ["New Delhi"]
      }
    ])
  })
);

describe("CountryList Component", () => {
  test("renders CountryList with countries", async () => {
    render(
      <Router>
        <CountryList />
      </Router>
    );

    // Check the page title is correct
    expect(document.title).toBe("COUNTRY HUB | Home");

    // Check the countries are rendered
    const countryCards = await screen.findAllByText(/Country Code:/i);
    expect(countryCards.length).toBe(2);

    // Check for country name
    expect(screen.getByText("United States of America")).toBeInTheDocument();
    expect(screen.getByText("India")).toBeInTheDocument();
  });

  // Test the serach by name component 
  test("searches for countries by name", async () => {
    render(
      <Router>
        <CountryList />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText("Search by country name / code...");
    fireEvent.change(searchInput, { target: { value: "USA" } });

    // Wait for countries to be fetched
    await waitFor(() => screen.getByText("United States of America"));

    // Check the searched country appears
    expect(screen.getByText("United States of America")).toBeInTheDocument();
  });

  // Test the filter by region component
  test("filters countries by region", async () => {
    render(
      <Router>
        <CountryList />
      </Router>
    );

    const regionSelect = screen.getByLabelText("Filter country by Region");
    fireEvent.change(regionSelect, { target: { value: "Americas" } });

    // Wait for the countries to be filtered and rendered
    await waitFor(() => screen.getByText("United States of America"));

    // Check the filtered country appears
    expect(screen.getByText("United States of America")).toBeInTheDocument();
    expect(screen.queryByText("India")).not.toBeInTheDocument();
  });

  // Test marking countries as favorites
  test("toggles favorites", async () => {
    render(
      <Router>
        <CountryList />
      </Router>
    );

    const favoriteButton = await screen.findByText("Add Favorite");

    // Click to add to favorites
    fireEvent.click(favoriteButton);
    await waitFor(() => expect(screen.getByText("Remove Favorite")).toBeInTheDocument());

    // Click again to remove from favorites
    fireEvent.click(screen.getByText("Remove Favorite"));
    await waitFor(() => expect(screen.getByText("Add Favorite")).toBeInTheDocument());
  });
});
