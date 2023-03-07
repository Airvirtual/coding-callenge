import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import { TransactionPoolsQuery } from "../graphql/queries";
import HeaderComponent from "./Header";
import Loader from "./Loader";
//import dayjs from 'dayjs' // ES 2015
dayjs().format();

const TopPools = ({ refresh }: { refresh: boolean }) => {
  const [isChart, setIsChart] = useState(false);
  const [result, reexecuteQuery] = useQuery({
    query: TransactionPoolsQuery,
  });
  const { data, fetching, error } = result;
  const refreshQuery = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: "network-only" });
  };
  useEffect(() => {
    refreshQuery();
  }, [refresh]);
  return (
    <Grid item xs={12} sx={{ p: 1 }}>
      <Card sx={{ width: "100%", height: "45vh", p: 1 }}>
        <CardHeader
          component={() => (
            <HeaderComponent
              setIsChart={() => setIsChart(!isChart)}
              title="Transactions"
              subTitle="transaction information"
              isChart={isChart}
              isDisplayChart={false}
            />
          )}
        />
        {fetching && <Loader />}
        {error && <p>Oh no... {error.message}</p>}
        {!fetching && !error && (
          <CardContent>
            <TableContainer sx={{ maxHeight: 350 }}>
              <Table stickyHeader aria-label="sticky table" size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Sr. No.</TableCell>
                    <TableCell>transaction Id</TableCell>
                    <TableCell>Amount(usd)</TableCell>
                    <TableCell>Minutes Before</TableCell>
                    <TableCell>Linked Accounts</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.swaps.map((d: any, i: number) => {
                    const now = new Date();
                    let ms = now.getMilliseconds();
                    const timeDiff = parseInt(d.timestamp) - ms;
                    const minutesBefore = Math.floor(
                      (timeDiff / 1000 / 60) % 60
                    );
                    console.log(minutesBefore);
                    return (
                      <TableRow key={i}>
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left">
                          <Link
                            href={`https://etherscan.io/tx/${d.transaction.id}`}
                            target="_"
                          >
                            <Typography variant="subtitle2" color="blue">
                              {d.transaction.id}
                            </Typography>
                          </Link>
                        </TableCell>
                        <TableCell>
                          {parseFloat(d.amountUSD).toFixed(2)}
                        </TableCell>
                        <TableCell align="left">
                          {minutesBefore} min before
                          {/* {timeDiff} */}
                          {/* {parseFloat(
                          d.poolDayData.reduce(
                            (sum: number, { volumeUSD }: any) =>
                              sum + parseFloat(volumeUSD),
                            0
                          )
                        ).toFixed(2)} */}
                        </TableCell>
                        <TableCell>
                          <Link
                            href={`https://etherscan.io/address/${d.sender}`}
                          >
                            <Typography variant="subtitle2" color="blue">
                              Sender : {d.sender}
                            </Typography>
                          </Link>
                          <Link
                            href={`https://etherscan.io/address/${d.recipient}`}
                          >
                            <Typography variant="subtitle2" color="blue">
                              Reciever : {d.recipient}
                            </Typography>
                          </Link>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

export default TopPools;
