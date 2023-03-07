import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import { Transaction, TransactionData } from "../../types";
import { formatLongText, formatNumber, formatTime } from "../../utils";
import Pagination from "../Pagination";
import TableSkeletonLoader from "../SkeletonLoader/TableSkeletonLoader";

export interface IProps {
  error: string | undefined;
  data: TransactionData | undefined;
  loading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pageSize: number;
}

const TransactionsTabContent = ({
  error,
  data,
  loading,
  setCurrentPage,
  currentPage,
  pageSize,
}: IProps) => {
  const [copy] = useCopyToClipboard();

  if (loading)
    return (
      <div id="table-skeleton-loader">
        <TableSkeletonLoader />
      </div>
    );
  if (error) return <p className="errorMsg">Oops, Error loading data</p>;

  return (
    <div className="tablecard">
      {/* Render Transactions tab content */}
      <div className="table-responsive">
        <table
          style={{ width: "100%", height: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID </th>
              <th>Linked Account</th>
              <th>Token0 </th>
              <th>Token1</th>
              <th>Total value </th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {data?.transactions?.map((item: Transaction, index: number) => (
              <tr key={index}>
                <td onClick={() => copy(String(item?.id))}>
                  <div className="flex-center">
                    {formatLongText(String(item?.id))}&nbsp;
                    <span className="clipboard-icon">&#x2398;</span>
                  </div>
                </td>
                <td onClick={() => copy(String(item?.swaps?.[0]?.recipient))}>
                  {item?.swaps?.[0]?.recipient ? (
                    <div className="flex-center">
                      {formatLongText(item?.swaps?.[0]?.recipient)}&nbsp;
                      <span className="clipboard-icon">&#x2398;</span>
                    </div>
                  ) : (
                    "-"
                  )}
                </td>
                <td>
                  {formatNumber(item?.swaps?.[0]?.token0?.totalSupply || "0")}
                </td>
                <td>
                  {formatNumber(item?.swaps?.[0]?.token1?.totalSupply || "0")}
                </td>
                <td>{formatNumber(item?.swaps?.[0]?.amountUSD || "0")}</td>
                <td>{formatTime(item?.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        total={data?.transactions?.length || 0}
        pageSize={pageSize}
      />
    </div>
  );
};

export default TransactionsTabContent;
