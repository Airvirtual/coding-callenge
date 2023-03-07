import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import RefreshButton from "./index";

describe("RefreshButton", () => {
  it("should render properly with activeTab prop", () => {
    const ReloadData = jest.fn();
    const activeTab = "Tokens";
    render(<RefreshButton ReloadData={ReloadData} activeTab={activeTab} />);

    expect(screen.getByText(/Reload Tokens/i)).toBeInTheDocument();
    expect(screen.getByTitle(/Reload Data/i)).toBeInTheDocument();
  });

  it("should call ReloadData function when clicked", () => {
    const ReloadData = jest.fn();
    const activeTab = "Transactions";
    render(<RefreshButton ReloadData={ReloadData} activeTab={activeTab} />);

    fireEvent.click(screen.getByText(/Reload Transactions/i));
    expect(ReloadData).toHaveBeenCalledTimes(1);
  });
});
