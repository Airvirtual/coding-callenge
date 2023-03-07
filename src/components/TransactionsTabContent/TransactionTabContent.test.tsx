import React from "react";
import { render, screen } from "@testing-library/react";
import TransactionsTabContent, { IProps } from "./index";

const mockProps: IProps = {
  error: undefined,
  data: {
    transactions: [
      {
        id: 1,
        swaps: [
          {
            recipient: "abc",
            token0: { totalSupply: "100" },
            token1: { totalSupply: "200" },
            amountUSD: "300",
          },
        ],
        timestamp: 1646123400000,
      },
    ],
  },
  loading: false,
  setCurrentPage: jest.fn(),
  currentPage: 1,
  pageSize: 10,
};

describe("TransactionsTabContent", () => {
  test("renders table with transaction data", () => {
    render(<TransactionsTabContent {...mockProps} />);

    // Check that the error message is not present
    const errorMsg = screen.queryByText("Oops, Error loading data");
    expect(errorMsg).not.toBeInTheDocument();

    // Check that the table rows are present with the expected data
    const rows = screen.getAllByRole("row");

    let expectedRowCount = 0;
    if (mockProps?.data?.transactions?.length) {
      expectedRowCount = mockProps.data.transactions.length + 1; // add 1 for the table header row
    }

    expect(rows).toHaveLength(expectedRowCount);

    const firstRowCells = screen.getAllByRole("cell").slice(0, 6);
    expect(firstRowCells).toHaveLength(6);
    expect(firstRowCells[1]).toHaveTextContent("abc");
    expect(firstRowCells[2]).toHaveTextContent("100");
    expect(firstRowCells[3]).toHaveTextContent("200");
    expect(firstRowCells[4]).toHaveTextContent("300");
  });

  test("renders error message when error is present", () => {
    render(
      <TransactionsTabContent {...mockProps} error="Oops, Error loading data" />
    );

    const errorMsg = screen.queryByText("Oops, Error loading data");
    expect(errorMsg).toBeInTheDocument();
  });
});
