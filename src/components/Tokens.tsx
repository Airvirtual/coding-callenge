import KeyboardDoubleArrowUpOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowUpOutlined";
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
import { useEffect } from "react";
import { useQuery } from "urql";
import { TokensQuery } from "../graphql/queries";
import HeaderComponent from "./Header";
import Loader from "./Loader";

import KeyboardDoubleArrowDownOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowDownOutlined";
const TopPools = ({ refresh }: { refresh: boolean }) => {
  const [result, reexecuteQuery] = useQuery({
    query: TokensQuery,
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
    <Grid item xs={6} sx={{ p: 1 }}>
      <Card sx={{ width: "100%", height: "42vh", p: 1 }} elevation={2}>
        <CardHeader
          component={() => (
            <HeaderComponent
              title="Tokens"
              subTitle="token informations"
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
                    <TableCell>Symbol</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>
                      Total <br />
                      Value
                      <br /> Locked
                    </TableCell>
                    <TableCell>
                      Price
                      <br />
                      Point
                      <br />
                      (usd)
                    </TableCell>
                    <TableCell>
                      Price
                      <br />
                      Change
                      <br />
                      (usd)
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.tokens.map((d: any, i: number) => {
                    let priceChage = 0;
                    if (d.tokenDayData.length > 1) {
                      const getPriceVal =
                        parseFloat(d.tokenDayData[0].priceUSD) /
                          parseFloat(d.tokenDayData[1].priceUSD) -
                        1;
                      priceChage = parseFloat((getPriceVal * 100).toFixed(3));
                    }
                    return (
                      <TableRow key={i}>
                        <TableCell align="left">{d.symbol}</TableCell>
                        <TableCell align="left">{d.name}</TableCell>
                        <TableCell align="left">
                          {parseFloat(d.totalValueLocked).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {parseFloat(d.tokenDayData[0].priceUSD).toFixed(4)}
                        </TableCell>
                        <TableCell>
                          {priceChage >= 0 ? (
                            <KeyboardDoubleArrowUpOutlinedIcon
                              sx={{ color: "green" }}
                            />
                          ) : (
                            <KeyboardDoubleArrowDownOutlinedIcon
                              sx={{ color: "red" }}
                            />
                          )}
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
