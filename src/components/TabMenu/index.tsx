import React, { useState } from "react";
import RefreshButton from "../RefreshButton";
import TokensTabContent from "../TokensTabContent";
import TopPoolsTabContent from "../TopPoolsTabContent";
import TransactionsTabContent from "../TransactionsTabContent";
import useFetchTokenData from "../../hooks/useFetchTokenData";
import useFetchTopPoolData from "../../hooks/useFetchTopPoolData";
import useFetchTransactionData from "../../hooks/useFetchTransactionData";

interface TabMenuProps {
  tabs: string[];
}

const TabMenu: React.FC<TabMenuProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [pageSize, setPageSize] = useState<number>(7);
  const [currentPage, setCurrentPage] = useState(0);

  // Fetch data
  const { tokenLoading, tokenData, errorMessage, refetchToken } =
    useFetchTokenData(pageSize, currentPage);
  const {
    transactionData,
    transactionLoading,
    refetchTransaction,
    errorMessageTrans,
  } = useFetchTransactionData(pageSize, currentPage);
  const { topPoolData, topPoolLoading, refetchTopPool, errorMessageTopPool } =
    useFetchTopPoolData(pageSize, currentPage);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    ReloadData(tab);
  };

  const ReloadData = (tab: string) => {
    // update values and refetch data
    setPageSize(7);
    setCurrentPage(0);

    switch (tab) {
      case "Tokens":
        refetchToken({ first: 7, skip: 0 });
        break;
      case "Transactions":
        refetchTransaction({ first: 7, skip: 0 });
        break;
      case "Top Pools":
        refetchTopPool({ first: 7, skip: 0 });
        break;
      default:
        break;
    }
  };

  return (
    <div className="tabmenu">
      <div className="flex-between">
        <ul>
          {tabs.map((tab) => (
            <li
              onClick={() => handleTabClick(tab)}
              className={activeTab === tab ? "active" : ""}
              key={tab}
            >
              {tab}
            </li>
          ))}
        </ul>
        <RefreshButton ReloadData={ReloadData} activeTab={activeTab} />
      </div>
      <div>
        {/* Render content based on activeTab */}
        {activeTab === "Tokens" && (
          <TokensTabContent
            data={tokenData}
            loading={tokenLoading}
            error={errorMessage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}
        {activeTab === "Transactions" && (
          <TransactionsTabContent
            data={transactionData}
            loading={transactionLoading}
            error={errorMessageTrans}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}

        {activeTab === "Top Pools" && (
          <TopPoolsTabContent
            data={topPoolData}
            loading={topPoolLoading}
            error={errorMessageTopPool}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            pageSize={pageSize}
          />
        )}
      </div>
    </div>
  );
};

export default TabMenu;
