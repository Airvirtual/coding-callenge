import "./App.css";
import * as React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Pools from "./pages/Pools";
import Tokens from "./pages/Tokens";
import Transactions from "./pages/Tranactions";
import { Sidebar } from "./pages/components/Sidebar";
function App() {
  const [inactive, setInactive] = React.useState(false);

  return (
    <div className="App">
      <Router>
        <Sidebar />
        <div className={`container ${inactive ? "inactive" : ""}`}>
          <Routes>
            <Route exact path="/" element={<Pools />} />
            <Route path="/tokens" element={<Tokens />} />
            <Route path="/transactions" element={<Transactions />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
