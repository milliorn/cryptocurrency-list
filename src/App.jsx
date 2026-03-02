import axios from "axios";

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import Coins from "./components/Coins";
import ErrorBoundary from "./components/ErrorBoundary";
import Navbar from "./components/Navbar";

import Coin from "./routes/Coin";
import { CACHE_TTL, COINGECKO_BASE_URL } from "./constants";

const CACHE_KEY = "coingecko-markets";
const URL = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`;

function App() {
  const [coins, setCoins] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const styles = "container m-auto max-w-screen-2xl";

  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);

        if (Date.now() - timestamp < CACHE_TTL) {
          setCoins(data);
          setLoading(false);
          return;
        }
      } catch {
        localStorage.removeItem(CACHE_KEY);
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
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to load coin data. Please try again later.");
        setLoading(false);
      });
  }, [retryCount]);

  return (
    <div className={styles}>
      <Navbar />
      <main>
        <ErrorBoundary>
          {loading ? (
            <p role="status">Loading...</p>
          ) : error ? (
            <div>
              <p role="alert">{error}</p>
              <button
                className="mt-2 bg-slate-600 border-2 border-slate-600 border-solid rounded-lg shadow-md shadow-slate-600 px-3 py-1 hover:bg-slate-500"
                onClick={() => {
                  setError(null);
                  setLoading(true);
                  setRetryCount((c) => c + 1);
                }}
              >
                Retry
              </button>
            </div>
          ) : (
            <Routes>
              <Route
                path="/cryptocurrency-list"
                element={<Coins coins={coins} />}
              />
              <Route path="/coin" element={<Coin />}>
                <Route path=":coinId" element={<Coin />} />
              </Route>
            </Routes>
          )}
        </ErrorBoundary>
      </main>
    </div>
  );
}

export default App;
