import React, { useEffect, useState, useMemo } from "react";
import { loadTransactions } from "../feed/TransactionData";
import { MaterialTableWrapper } from "./components/table";
import Button from "./components/Button";
var moment = require("moment");

const Transactions = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Create The Table Structure for Pools Information
  // Cell Value is Used For Formating of the Value and How to display it
  const columns = useMemo(
    () => [
      {
        accessorKey: "transaction.id", //access nested data with dot notation
        header: "Hash",
        Cell: ({ cell }) => <a href={`${"https://etherscan.io/tx/" + cell.getValue()}`}>{`...` + cell.getValue().slice(-15)}</a>,
        size: 50, //small column
      },
      {
        accessorKey: "timestamp",
        header: "Time",
        Cell: ({ cell }) => <span>{moment(new Date(cell.getValue() * 1000), "MM/DD/YYYY").fromNow()}</span>,
        size: 80, //small column
      },
      {
        accessorKey: "token0.name", //normal accessorKey
        header: "Token 0",
        size: 80, //small column
      },
      {
        accessorKey: "token1.name", //normal accessorKey
        header: "Token1",
        size: 80, //small column
      },
      {
        accessorKey: "sender", //normal accessorKey
        header: "Sender",
        Cell: ({ cell }) => <span>{"..." + cell.getValue().slice(-15)}</span>,
        size: 50, //small column
      },
      {
        accessorKey: "recipient", //normal accessorKey
        header: "Recipient",
        Cell: ({ cell }) => <a href={`${"https://etherscan.io/address/" + cell.getValue()}`}>{`...` + cell.getValue().slice(-15)}</a>,
        size: 50, //small column
      },
    ],
    []
  );
  useEffect(() => {
    try {
      if (!isFetching) {
        setIsFetching(true);
        loadTransactions(transactions.length).then((response) => {
          setTransactions((prevState) => [...prevState, ...response]);
          setIsFetching(false);
        });
      }
    } catch (error) {
      setIsFetching(false);
    }
  }, []);
  const handleUpdate = () => {
    loadTransactions(transactions.length).then((response) => {
      setTransactions((prevState) => [...prevState, ...response]);
      setIsFetching(false);
    });
  };
  const refresh = () =>{
    setTransactions([]);
    handleUpdate();
  }

  return (
    <div>
      <div className="align-right">
        <Button refresh={refresh}>Refresh</Button>
      </div>
      <MaterialTableWrapper data={transactions} columns={columns} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Transactions;
