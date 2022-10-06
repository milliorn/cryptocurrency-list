import axios from "axios";

import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Coins from "./components/Coins";
import Navbar from "./components/Navbar";

import Coin from "./routes/Coin";

function App() {
  const [coins, setCoins] = useState([]);
  const styles = "container m-auto max-w-screen-2xl";

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCoins(response.data);
        //console.log(response.data[0])
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={styles}>
      <Navbar />
      <Routes>
        <Route path="/cryptocurrency-list" element={<Coins coins={coins} />} />
        <Route path="/coin" element={<Coin />}>
          <Route path=":coinId" element={<Coin />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
