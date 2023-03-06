import { useState, useEffect } from 'react';
import Tabs from 'rc-tabs';
import Table from 'rc-table';
import './App.css';
import { ColumnsType } from 'rc-table/lib/interface';
import Pagination from 'rc-pagination';
import getPools from './api/pools';
import getTokens from './api/tokens';
import getTransactions from './api/transactions';

type ArrElement<ArrType> = ArrType extends readonly (infer ElementType)[] ? ElementType : never;

type Data = ReturnType<typeof getPools> | ReturnType<typeof getTokens> | ReturnType<typeof getTransactions>;

const tabs = new Map<
  string,
  {
    getData: (page: number, size: number) => Data;
    columns: ColumnsType<ArrElement<Awaited<Data>>>;
  }
>();

tabs.set('tokens', {
  getData: (page, number) => getTokens(page, number),
  columns: [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
      width: 100,
    },
    {
      title: 'totalValueLocked',
      dataIndex: 'totalValueLocked',
      key: 'totalValueLocked',
      width: 100,
    },
    {
      title: 'price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      title: 'priceChange',
      dataIndex: 'priceChange',
      key: 'priceChange',
      width: 100,
    },
  ],
});
tabs.set('pools', {
  getData: (page, size) => getPools(page, size),
  columns: [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'totalValueLocked',
      dataIndex: 'totalValueLocked',
      key: 'totalValueLocked',
      width: 100,
    },
    {
      title: 'volume',
      dataIndex: 'volume',
      key: 'volume',
      width: 100,
    },
  ],
});
tabs.set('transactions', {
  getData: (page, size) => getTransactions(page, size, Date.now() - 1000 * 60 * 15),
  columns: [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
    },
    {
      title: 'timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 100,
    },
    {
      title: 'amount0',
      dataIndex: 'amount0',
      key: 'amount0',
      width: 100,
    },
    {
      title: 'amount1',
      dataIndex: 'amount1',
      key: 'amount1',
      width: 100,
    },
  ],
});

function App() {
  const [activeTab, setActiveTab] = useState('transactions');
  const [data, setData] = useState<Awaited<Data>>([] as unknown as Awaited<Data>);
  const [loading, setLoading] = useState(false);

  const [size, setSize] = useState(10);
  const [current, setCurrent] = useState(1);

  const onRefreshButtonClick = () => {
    setLoading(true);
    tabs
      .get(activeTab)
      ?.getData(current - 1, size)
      .then((d) => setData(d))
      .finally(() => {
        setLoading(false);
      });
  };

  const onPaginationChange = (page: number, _pageSize: number) => {
    setCurrent(page);
  };

  const onChangeActiveKey = (newActiveTab: string) => {
    setActiveTab(newActiveTab);
    setCurrent(1);
  };

  const prevNextArrow = (_current: any, type: string, originalElement: any) => {
    if (type === 'prev') {
      return <button type="button">{'<'}</button>;
    }
    if (type === 'next') {
      return <button type="button">{'>'}</button>;
    }
    return originalElement;
  };

  useEffect(() => {
    setLoading(true);
    tabs
      .get(activeTab)
      ?.getData(current - 1, size)
      .then((d) => setData(d))
      .finally(() => {
        setLoading(false);
      });
  }, [activeTab, current, size]);

  const items = [...tabs.entries()].map(([k, v]) => ({
    key: k,
    label: k,
  }));

  return (
    <div className="App">
      <div>
        <button type="button" onClick={onRefreshButtonClick} disabled={loading}>
          Refresh Data
        </button>
      </div>
      <Tabs
        activeKey={activeTab}
        onChange={onChangeActiveKey}
        onTabClick={onChangeActiveKey}
        direction="ltr"
        items={items}
      />
      {loading ? (
        <div>loading...</div>
      ) : (
        <Table
          columns={tabs.get(activeTab)?.columns}
          data={data.map((it) => ({ ...it, key: it.id }))}
          // eslint-disable-next-line react/no-unstable-nested-components
          footer={(_d) => (
            <Pagination
              className="pagination-data"
              showTotal={(total, range) => `Showing ${range[0]}-${range[1]} of ${total}`}
              total={100}
              current={current}
              pageSize={size}
              onChange={onPaginationChange}
              showSizeChanger={false}
              itemRender={prevNextArrow}
              showTitle={false}
            />
          )}
        />
      )}
    </div>
  );
}

export default App;
