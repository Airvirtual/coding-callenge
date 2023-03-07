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
} from "@mui/material";
import { useEffect, useState } from "react";
import { useQuery } from "urql";
import BarChart from "../components/BarChart";
import { TopPoolsQuery } from "../graphql/queries";
import HeaderComponent from "./Header";
import Loader from "./Loader";

const TopPools = ({ refresh }: { refresh: boolean }) => {
  const [isChart, setIsChart] = useState(false);
  const [result, reexecuteQuery] = useQuery({
    query: TopPoolsQuery,
  });
  console.log(isChart);
  const { data, fetching, error } = result;
  const refreshQuery = () => {
    // Refetch the query and skip the cache
    reexecuteQuery({ requestPolicy: "network-only" });
  };
  useEffect(() => {
    refreshQuery();
  }, [refresh]);

  return (
    <Grid item xs={6} sx={{ p: 1 }}>
      <Card sx={{ width: "100%", height: "42vh", p: 1 }}>
        <CardHeader
          component={() => (
            <HeaderComponent
              isChart={isChart}
              setIsChart={(val) => setIsChart(val)}
              title="Top Pools"
              subTitle="top token volume and 24 hour token volume in USD"
              isDisplayChart={true}
            />
          )}
        />
        {fetching && <Loader />}
        {error && <p>Oh no... {error.message}</p>}
        {!fetching && !error && (
          <CardContent sx={{ pb: 1 }}>
            {isChart && (
              <Grid sx={{ maxHeight: 350 }}>
                <BarChart
                  chartData={data.pools.map((val: any, i: number) => ({
                    name: i + 1,

                    tvl: parseFloat(val.totalValueLockedUSD).toFixed(2),
                    daytvl: parseFloat(
                      val.poolDayData.reduce(
                        (sum: number, { volumeUSD }: any) =>
                          sum + parseFloat(volumeUSD),
                        0
                      )
                    ).toFixed(2),
                    amount: parseFloat(
                      val.poolDayData.reduce(
                        (sum: number, { volumeUSD }: any) =>
                          sum + parseFloat(volumeUSD),
                        0
                      )
                    ).toFixed(2),
                  }))}
                />
              </Grid>
            )}
            {!isChart && (
              <TableContainer sx={{ maxHeight: 350 }}>
                <Table stickyHeader aria-label="sticky table" size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Id</TableCell>
                      <TableCell>Volume(USD)</TableCell>
                      <TableCell>24 hour Volume</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.pools.map((d: any, i: number) => {
                      return (
                        <TableRow key={i}>
                          <TableCell align="left">{d.id}</TableCell>
                          <TableCell align="left">
                            {parseFloat(d.totalValueLockedUSD).toFixed(2)}
                          </TableCell>
                          <TableCell align="left">
                            {parseFloat(
                              d.poolDayData.reduce(
                                (sum: number, { volumeUSD }: any) =>
                                  sum + parseFloat(volumeUSD),
                                0
                              )
                            ).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        )}
      </Card>
    </Grid>
  );
};

export default TopPools;
