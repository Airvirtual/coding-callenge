import { render, screen } from "@testing-library/react";
import App from "./App";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
const mocks: MockedResponse[] = [];

describe("App", () => {
  it("renders app without crashing", () => {
    render(
      <MockedProvider mocks={mocks}>
        <App />
      </MockedProvider>
    );

    const header = screen.getByRole("heading", {
      name: /uniswap v3 data visualization/i,
    });
    expect(header).toBeInTheDocument();

    const tabMenu = screen.getByRole("list");
    expect(tabMenu).toBeInTheDocument();
  });
});
