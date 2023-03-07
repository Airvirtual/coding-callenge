import React from "react";
import TabMenu from "./components/TabMenu";
import { tablist } from "./constants/tabs";

function App() {
  return (
    <>
      <h2 className="text-center">Uniswap V3 Data Visualization</h2>
      <TabMenu tabs={tablist} />
    </>
  );
}

export default App;
