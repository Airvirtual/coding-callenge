import { render, screen } from "@testing-library/react";
import TopPoolsTabContent, { IProps } from "./index";

const mockData: IProps = {
  error: undefined,
  data: {
    pools: [
      {
        id: 1,
        totalValueLockedUSD: "1000",
        volumeUSD: "500",
        token0: { symbol: "ETH" },
        token1: { symbol: "USDT" },
      },
      {
        id: 2,
        totalValueLockedUSD: "2000",
        volumeUSD: "1000",
        token0: { symbol: "BTC" },
        token1: { symbol: "USDC" },
      },
    ],
  },
  loading: false,
  setCurrentPage: jest.fn(),
  currentPage: 1,
  pageSize: 7,
};

describe("TopPoolsTabContent", () => {
  it("should render table with pool data", async () => {
    render(
      <TopPoolsTabContent
        error={mockData.error}
        data={mockData.data}
        loading={mockData.loading}
        setCurrentPage={mockData.setCurrentPage}
        currentPage={mockData.currentPage}
        pageSize={mockData.pageSize}
      />
    );

    // Check that the error message is not present
    const errorMsg = screen.queryByText("Oops, Error loading data");
    expect(errorMsg).not.toBeInTheDocument();

    // Check that the table rows are present with the expected data
    const rows = screen.getAllByRole("row");

    let expectedRowCount = 0;
    if (mockData?.data?.pools?.length) {
      expectedRowCount = mockData.data.pools.length + 1; // add 1 for the table header row
    }

    expect(rows).toHaveLength(expectedRowCount);

    const firstRowCells = screen.getAllByRole("cell").slice(0, 5);
    expect(firstRowCells).toHaveLength(5);
    expect(firstRowCells[1]).toHaveTextContent("1,000");
    expect(firstRowCells[2]).toHaveTextContent("500");
    expect(firstRowCells[3]).toHaveTextContent("ETH");
    expect(firstRowCells[4]).toHaveTextContent("USDT");

    const secondRowCells = screen.getAllByRole("cell").slice(5, 10);
    expect(secondRowCells).toHaveLength(5);
    expect(secondRowCells[1]).toHaveTextContent("2,000");
    expect(secondRowCells[2]).toHaveTextContent("1,000");
    expect(secondRowCells[3]).toHaveTextContent("BTC");
    expect(secondRowCells[4]).toHaveTextContent("USDC");
  });
});
