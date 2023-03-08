import React, { useEffect, useState, useMemo } from "react";
import { loadPools } from "../feed/poolData";
import { MaterialTableWrapper } from "./components/table";
import Button from "./components/Button";
const formatNumber = (Value) => {
  return Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(Value);
};
const Pools = (props) => {
  const [pools, setPools] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  // Create The Table Structure for Pools Information
  // Cell Value is Used For Formating of the Value and How to display it
  const columns = useMemo(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Pool Address",
        Cell: ({ cell }) => <a href={`${"https://etherscan.io/address/" + cell.getValue()}`}>{cell.getValue()}</a>,
        size: 50, //small column
      },
      {
        accessorKey: "totalValueLockedUSD",
        header: "TVL",
        Cell: ({ cell }) => <span>{formatNumber(cell.getValue())}</span>,
        size: 50, //small column
      },
      {
        accessorKey: "volumeUSD", //normal accessorKey
        header: "USD",
        Cell: ({ cell }) => <span>{formatNumber(cell.getValue())}</span>,
        size: 50, //small column
      },
    ],
    []
  );
  useEffect(() => {
    try {
      if (!isFetching) {
        setIsFetching(true);
        loadPools(pools.length)
          .then((response) => {
            console.log(response);
            setPools((prevState) => [...prevState, ...response]);
            setIsFetching(false);
          })
          .finally((error) => setIsFetching(false));
      }
    } catch (error) {
      console.log(error);
      setIsFetching(false);
    }
  }, []);

  // Refresh
  const handleUpdate = () => {
    if (!isFetching) {
      setIsFetching(true);
      loadPools(pools.length)
        .then((response) => {
          console.log(response);
          setPools((prevState) => [...prevState, ...response]);
          setIsFetching(false);
        })
        .finally((error) => setIsFetching(false));
    }
  };
  const refresh = () => {
    setPools([]);
    handleUpdate();
  };
  return (
    <div>
      <div className='align-right'>
        <Button refresh={refresh}>Refresh</Button>
      </div>
      <MaterialTableWrapper data={pools} columns={columns} handleUpdate={handleUpdate} />
    </div>
  );
};

export default Pools;
