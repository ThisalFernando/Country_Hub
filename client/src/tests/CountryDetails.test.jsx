import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CountryDetails from "./CountryDetails";

// Mock the fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      {
        cca2: "US",
        cca3: "USA",
        name: { common: "United States", official: "United States of America" },
        flags: { svg: "https://flagcdn.com/us.svg" },
        capital: ["Washington, D.C."],
        region: "Americas",
        subregion: "Northern America",
        currencies: { USD: { name: "United States Dollar", symbol: "$" } },
        population: 331002651,
        area: 9833517,
        languages: { eng: "English" },
        timezones: ["UTC−05:00"],
      },
    ]),
  })
);

describe("CountryDetails", () => {
  test("renders loading message when country is not yet fetched", () => {
    render(
      <MemoryRouter initialEntries={["/country/USA"]}>
        <Routes>
          <Route path="/country/:countryCode" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  // Test the fetching the country details
  test("renders country details after fetching data", async () => {
    render(
      <MemoryRouter initialEntries={["/country/USA"]}>
        <Routes>
          <Route path="/country/:countryCode" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText("United States")).toBeInTheDocument();
    expect(screen.getByText("OFFICIAL NAME: United States of America")).toBeInTheDocument();
    expect(screen.getByAltText("Flag of United States")).toHaveAttribute("src", "https://flagcdn.com/us.svg");
    expect(screen.getByText("COUNTRY CODE: US")).toBeInTheDocument();
    expect(screen.getByText("CAPITAL: Washington, D.C.")).toBeInTheDocument();
    expect(screen.getByText("REGION: Americas")).toBeInTheDocument();
    expect(screen.getByText("SUBREGION: Northern America")).toBeInTheDocument();
    expect(screen.getByText("CURRENCY: United States Dollar ($)")).toBeInTheDocument();
    expect(screen.getByText("POPULATION: 331,002,651")).toBeInTheDocument();
    expect(screen.getByText("AREA: 9,833,517 km²")).toBeInTheDocument();
    expect(screen.getByText("LANGUAGES: English")).toBeInTheDocument();
    expect(screen.getByText("TIMEZONES: UTC−05:00")).toBeInTheDocument();
  });

  // Test the back to home button
  test("back button works and redirects to the countries list", async () => {
    render(
      <MemoryRouter initialEntries={["/country/USA"]}>
        <Routes>
          <Route path="/country/:countryCode" element={<CountryDetails />} />
          <Route path="/countries" element={<div>Countries List</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    fireEvent.click(screen.getByText(/BACK TO HOME/i));
    
    expect(screen.getByText("Countries List")).toBeInTheDocument();
  });

  // Test the error fetching country details
  test("handles error when fetching country details", async () => {
    global.fetch.mockImplementationOnce(() => Promise.reject("API Error"));

    render(
      <MemoryRouter initialEntries={["/country/USA"]}>
        <Routes>
          <Route path="/country/:countryCode" element={<CountryDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
});
