import { TopPool, TopPoolData } from "../../types";
import { formatLongText, formatNumber } from "../../utils";
import useCopyToClipboard from "../../hooks/useCopyToClipboard";
import Pagination from "../Pagination";
import TableSkeletonLoader from "../SkeletonLoader/TableSkeletonLoader";

export interface IProps {
  error: string | undefined;
  data: TopPoolData | undefined;
  loading: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  pageSize: number;
}

const TopPoolsTabContent = ({
  error,
  data,
  loading,
  setCurrentPage,
  currentPage,
  pageSize,
}: IProps) => {
  const [copy] = useCopyToClipboard();

  if (loading) return <TableSkeletonLoader />;
  if (error) return <p className="errorMsg">Oops, Error loading data</p>;

  return (
    <div className="tablecard">
      {/* Render Top Pools tab content */}
      <div className="table-responsive">
        <table
          style={{ width: "100%", height: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th>ID </th>
              <th>Total value locked (USD)</th>
              <th>Volume (USD)</th>
              <th>Token0 </th>
              <th>Token1</th>
            </tr>
          </thead>
          <tbody>
            {data?.pools?.map((item: TopPool, index: number) => (
              <tr key={index}>
                <td onClick={() => copy(String(item?.id))}>
                  <div className="flex-center">
                    {formatLongText(String(item?.id))}&nbsp;
                    <span className="clipboard-icon">&#x2398;</span>
                  </div>
                </td>
                <td>{formatNumber(item?.totalValueLockedUSD) || "-"}</td>
                <td>{formatNumber(item?.volumeUSD || "0")}</td>
                <td>{item?.token0?.symbol || "0"}</td>
                <td>{item?.token1?.symbol || "0"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        total={data?.pools?.length || 0}
        pageSize={pageSize}
      />
    </div>
  );
};

export default TopPoolsTabContent;
