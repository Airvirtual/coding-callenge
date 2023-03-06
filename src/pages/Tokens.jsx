import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Skeleton from 'react-loading-skeleton'
import { Button } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css'

function Tokens(props) {

    const [tokens, setTokens] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    useEffect(() => {
        loadMoreData(0);
    }, [])

    const loadMoreData = (skipAmount) => {
        setIsFetching(true);
        fetch("https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                query: `
                {
                    tokens(first: 10, skip: ${skipAmount}, orderBy: symbol, direction: asc, where: { derivedETH_not: 0 }) {
                      id
                      symbol
                      name
                      derivedETH
                      totalValueLocked
                      tokenDayData(
                          orderBy: date,
                          orderDirection: desc,
                          first: 2,
                          where: { date_gt: -1 }
                        ) {
                          date
                          priceUSD
                      }
                    }
                  }
        `,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const tokenData = data?.data?.tokens ?? [];
                setTokens((prevState) => [...prevState, ...tokenData]);
                setIsFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setIsFetching(false);
            });
    }

    const handleUpdate = () => {
        setTokens([]);
        loadMoreData(0);
    }

    return (
        <section className="coin-list">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block-text">
                            <h3 className="heading">Top Tokens</h3>
                            <Link to="#" className="btn-action-2" onClick={handleUpdate}>Update List</Link>
                        </div>

                        <div className="coin-list__main">
                            <Tabs>
                                <TabPanel>
                                    <div className="content-inner">
                                        <table className="table">
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Symbol</th>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Price Point(USD)</th>
                                                    <th scope="col">Price Change</th>
                                                    <th scope="col">TVL</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    tokens.map((token, idx) => {
                                                        let priceChage = 0;
                                                        if(token.tokenDayData.length > 1) {
                                                            priceChage = ((token.tokenDayData[0].priceUSD / token.tokenDayData[1].priceUSD - 1) * 100).toFixed(3);
                                                        }
                                                        return (
                                                            <tr key={idx}>
                                                                <td>{idx + 1}</td>
                                                                <td>{token.symbol}</td>
                                                                <td>{token.name}</td>
                                                                <td>{(token.tokenDayData[0].priceUSD * 1).toFixed(4)}</td>
                                                                <td className={priceChage >= 0 ? 'up': 'down'}>{priceChage}%</td>
                                                                <td className="boild">${(token.totalValueLocked * 1).toFixed(2)}</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                <tr><td colSpan={6} style={{textAlign: 'center'}}>{isFetching ? <Skeleton count={1} height={50}></Skeleton> : <Button onClick={() => loadMoreData(tokens.length)}>Load More</Button>}</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </TabPanel>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tokens;