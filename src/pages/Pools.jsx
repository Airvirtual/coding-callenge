import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Tabs, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Skeleton from 'react-loading-skeleton'
import { Button } from 'react-bootstrap';
import 'react-loading-skeleton/dist/skeleton.css'

function Pools(props) {

    const [pools, setPools] = useState([]);
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
            pools(first: 10, skip: ${skipAmount}, orderBy: volumeUSD, orderDirection: desc) {
              id
              totalValueLockedUSD
              volumeUSD
            }
          }
        `,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                const poolData = data?.data?.pools ?? [];
                setPools((prevState) => [...prevState, ...poolData]);
                setIsFetching(false);
            })
            .catch((error) => {
                console.error(error);
                setIsFetching(false);
            });
    }

    const handleUpdate = () => {
        setPools([]);
        loadMoreData(0);
    }

    return (
        <section className="coin-list">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="block-text">
                            <h3 className="heading">Top Pools</h3>
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
                                                    <th scope="col">Pair Address</th>
                                                    <th scope="col">volumeUSD</th>
                                                    <th scope="col">TVL(USD)</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {
                                                    pools.map((pool, idx) => {
                                                        let poolAddy = pool.id.substr(0, 6) + "..." + pool.id.substr(-4);
                                                        return (
                                                            <tr key={idx}>
                                                                <td>{idx + 1}</td>
                                                                <td>{poolAddy}</td>
                                                                <td className="boild">${(pool.volumeUSD * 1).toFixed(2)}</td>
                                                                <td className="boild">${(pool.totalValueLockedUSD * 1).toFixed(2)}</td>
                                                            </tr>
                                                        );
                                                    })
                                                }
                                                <tr><td colSpan={4} style={{textAlign: 'center'}}>{isFetching ? <Skeleton count={1} height={50}></Skeleton> : <Button onClick={() => loadMoreData(pools.length)}>Load More</Button>}</td></tr>
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

export default Pools;