import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Skeleton from 'react-loading-skeleton'
import { Button } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css';
import img from "../assets/images/icon/link.png";

function Transactions(props) {

    const [transactions, setTransactions] = useState([]);
    const [isFetching, setIsFetching] = useState(false);
    const [nowTime, setNowTime] = useState(0);

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
                    swaps(first: 10, skip: ${skipAmount}, orderBy: timestamp, orderDirection: desc) {
                        id
                        timestamp
                        token0 {
                          id
                          name
                        }
                        token1 {
                          id
                          name
                        }
                        transaction {
                          id
                        }
                        amountUSD
                        recipient
                        sender
                        amount0
                        amount1
                    }
                  }
        `,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const transactionData = data?.data?.swaps ?? [];
                setTransactions((prevState) => [...prevState, ...transactionData].sort((a, b) => b.timestamp - a.timestamp));
                setNowTime(new Date().getTime());
                setIsFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setIsFetching(false);
            });
    }

    const handleUpdate = () => {
        setTransactions([]);
        loadMoreData(0);
    }

    const formatDuration = (milliseconds) => {
        const seconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const remainingHours = hours % 24;
        const remainingMinutes = minutes % 60;
        const remainingSeconds = seconds % 60;
        const parts = [];
        if (days > 0) {
            parts.push(days + " day");
        }
        if (remainingHours > 0) {
            parts.push(remainingHours + " hr");
        }
        if (remainingMinutes > 0) {
            parts.push(remainingMinutes + " min");
        }
        if (remainingSeconds > 0) {
            parts.push(remainingSeconds + " sec");
        }
        return parts.length ? parts.join(" ") + " ago" : "Just now";
    }

    return (
        <section className="coin-list">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block-text">
                            <h3 className="heading">Top Transactions</h3>
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
                                                    <th scope="col">Linked Account</th>
                                                    <th scope="col">Total Value(USD)</th>
                                                    <th scope="col">Token Amounts</th>
                                                    <th scope="col">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    transactions.map((tx, idx) => {
                                                        let tokenShow = tx.amount1 > 0 ? (tx.amount0 * -1).toFixed(2) + " " + tx.token0.name : (tx.amount1 * -1).toFixed(2) + " " + tx.token1.name;
                                                        let diffString = formatDuration((nowTime - tx.timestamp * 1000).toFixed());
                                                        return (
                                                            <tr key={idx}>
                                                                <td>{idx + 1}</td>
                                                                <td><Link to={"https://etherscan.io/address/" + tx.recipient} target="_blank">{tx.recipient.substr(0, 6) + "..." + tx.recipient.substr(-4)}<img src={img} width="15px" /></Link></td>
                                                                <td>{(tx.amountUSD * 1).toFixed(2)}</td>
                                                                <td>{tokenShow}</td>
                                                                <td>{diffString}</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                <tr><td colSpan={5} style={{textAlign: 'center'}}>{isFetching ? <Skeleton count={1} height={50}></Skeleton> : <Button onClick={() => loadMoreData(transactions.length)}>Load More</Button>}</td></tr>
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

export default Transactions;