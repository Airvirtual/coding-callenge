import React, { useEffect, useState, useMemo } from "react";
import ReactDOM from "react-dom";
import { loadTokens } from "../feed/tokenData";
import { MaterialTableWrapper } from "./components/table";
import Button from "./components/Button";

const formatNumber = (Value) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Value);
};
const Tokens = (props) => {
  const [tokens, setTokens] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    try {
      setIsFetching(true);
      loadTokens(tokens.length).then((response) => {
        setTokens((prevState) => [...prevState, ...response]);
        setIsFetching(false);
      });
    } catch (error) {
      setIsFetching(false);
    }
  }, []);
  // Create The Table Structure for Tokens Information
  // Cell Value is Used For Formating of the Value and How to display it
  const columns = useMemo(
    () => [
      {
        accessorKey: "symbol", //access nested data with dot notation
        header: "Symbol",
        size: 50, //small column
      },
      {
        accessorKey: "name",
        header: "Name",
        size: 50, //small column
      },
      {
        accessorKey: "totalValueLocked", //normal accessorKey
        header: "TVL",
        Cell: ({ cell }) => <span>{formatNumber(cell.getValue())}</span>,
        size: 50, //small column
      },
      {
        accessorKey: "tokenDayData", //normal accessorKey
        header: "priceUSD",
        size: 50, //small column
        Cell: ({ cell }) => <span>{formatNumber(cell.getValue()[0].priceUSD)}</span>,
      },
      {
        accessorKey: "derivedETH", //normal accessorKey
        header: "Derived ETH",
        Cell: ({ cell }) => <span>{Number(cell.getValue()).toFixed(5)}</span>,
        size: 50, //small column
      },
      {
        accessorKey: "id", //normal accessorKey
        header: "Address",
        Cell: ({ cell }) => <a href={`${"https://etherscan.io/address/" + cell.getValue()}`}>{`...` + cell.getValue().slice(-15)}</a>,
        size: 50, //small column
      },
    ],
    []
  );
  const handleUpdate = () => {
    loadTokens(tokens.length).then((response) => {
      setTokens((prevState) => [...prevState, ...response]);
      setIsFetching(false);
    });
  };

  const refresh = ()=>{
    setTokens([]);
    handleUpdate();
  }
  return (
    <div>
      <div className="align-right">
        <Button refresh={refresh}>Refresh</Button>
      </div>

      <MaterialTableWrapper data={tokens} columns={columns} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Tokens;
