import axios from "axios";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Coins from "./components/Coins";
import Navbar from "./components/Navbar";

import Coin from "./routes/Coin";

const CACHE_KEY = "coingecko-markets";
const CACHE_TTL = 5 * 60 * 1000;
const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const styles = "container m-auto max-w-screen-2xl";

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_TTL) {
        setCoins(data);
        return;
      }
    }

    axios
      .get(URL)
      .then((response) => {
        setCoins(response.data);
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ data: response.data, timestamp: Date.now() })
        );
      })
      .catch((error) => {
        console.log(error);
        setError("Failed to load coin data. Please try again later.");
      });
  }, []);

  return (
    <div className={styles}>
      <Navbar />
      <main>
        {error ? (
          <p>{error}</p>
        ) : (
          <Routes>
            <Route path="/cryptocurrency-list" element={<Coins coins={coins} />} />
            <Route path="/coin" element={<Coin />}>
              <Route path=":coinId" element={<Coin />} />
            </Route>
          </Routes>
        )}
      </main>
    </div>
  );
}

export default App;
