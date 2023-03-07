import { Token, TokenData } from "../../types";
import { formatNumber } from "../../utils";
import Pagination from "../Pagination";
import TableSkeletonLoader from "../SkeletonLoader/TableSkeletonLoader";

interface IProps {
  error: string | undefined;
  data: TokenData | undefined;
  loading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pageSize: number;
}

const TokensTabContent = ({
  error,
  data,
  loading,
  setCurrentPage,
  currentPage,
  pageSize,
}: IProps) => {
  if (loading) return <TableSkeletonLoader />;
  if (error) return <p className="errorMsg">Oops, Error loading data</p>;

  return (
    <div className="tablecard">
      {/* Render Tokens tab content */}
      <div className="table-responsive">
        <table
          style={{ width: "100%", height: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>Name </th>
              <th>Symbol</th>
              <th>Price point</th>
              <th>Price change</th>
              <th>Total volume locked</th>
            </tr>
          </thead>
          <tbody>
            {data?.tokens?.map((token: Token, index: number) => {
              return (
                <tr key={index}>
                  <td>{token?.name}</td>
                  <td>{token?.symbol}</td>
                  <td>
                    {formatNumber(
                      Number(token?.tokenDayData?.[0]?.priceUSD || 0)
                    )}{" "}
                  </td>
                  <td>{`${
                    Number(token?.tokenDayData?.[0]?.close) -
                      Number(token?.tokenDayData?.[0]?.open) || 0
                  }%`}</td>
                  <td>{formatNumber(Number(token?.totalValueLocked))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        total={data?.tokens?.length || 0}
        pageSize={pageSize}
      />
    </div>
  );
};

export default TokensTabContent;
