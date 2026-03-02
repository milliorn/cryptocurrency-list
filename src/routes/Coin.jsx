import axios from "axios";
import DOMPurify from "dompurify";
import "react-lazy-load-image-component/src/effects/blur.css";

import { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

import CoinTable from "../components/CoinTable";
import { CACHE_TTL, COINGECKO_BASE_URL } from "../constants";

const styles = {
  coinHeading: "items-center flex my-4 mx-0",
  coinPrice: "items-center flex justify-center",
  content:
    "bg-zinc-800 rounded-lg flex flex-col	my-4 mx-auto max-w-3xl py-3 px-1 shadow-2xl	shadow-zinc-900	",
  heading: "my-4 mx-0",
  img: "h-12	mr-2",
  info: "grid grid-cols-2",
  infoParagraph: "pr-4",
  rank: "my-2 mx-0",
  rankBtn:
    "bg-slate-600 border-2	border-slate-600 border-solid	rounded-lg	shadow-md	shadow-slate-600 p-1",
  retryBtn:
    "mt-2 bg-slate-600 border-2 border-slate-600 border-solid rounded-lg shadow-md shadow-slate-600 px-3 py-1 hover:bg-slate-500",
  row: "flex justify-between my-2 mx-0 pb-2 border-b-2	border-solid	border-zinc-500",
  stats: "sm:grid gap-8	sm:grid-cols-2 w-full",
  statsRowParagraph: "text-neutral-300",
  table: "table-auto my-2 mx-0",
  tableRow: "bg-zinc-600",
  thTd: "p-2 text-center border-x-2	border-solid	border-zinc-700 text-xs",
};

const Coin = () => {
  const params = useParams();
  const [coin, setCoin] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    if (!params.coinId) {
      setError("No coin selected. Please go back and select a coin.");
      setLoading(false);
      return;
    }

    const url = `${COINGECKO_BASE_URL}/coins/${params.coinId}`;
    const CACHE_KEY = `coingecko-coin-${params.coinId}`;

    const cached = localStorage.getItem(CACHE_KEY);

    if (cached) {
      try {
        const { data, timestamp } = JSON.parse(cached);

        if (Date.now() - timestamp < CACHE_TTL) {
          setCoin(data);
          setLoading(false);
          return;
        }
      } catch {
        localStorage.removeItem(CACHE_KEY);
      }
    }

    const controller = new AbortController();

    axios
      .get(url, { signal: controller.signal })
      .then((res) => {
        setCoin(res.data);

        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ data: res.data, timestamp: Date.now() })
          );
        } catch (e) {
          console.warn("Cache write failed:", e.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;

        console.error(error);
        setError("Failed to load coin data. Please try again later.");
        setLoading(false);
      });

    return () => controller.abort();
  }, [params.coinId, retryCount]);

  if (loading) return <p role="status">Loading...</p>;

  if (error)
    return (
      <div>
        <p role="alert">{error}</p>
        <button
          className={styles.retryBtn}
          onClick={() => {
            setError(null);
            setLoading(true);
            setRetryCount((c) => c + 1);
          }}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div className="coin-container">
      <div className={styles.content}>
        <div className={styles.rank}>
          <span className={styles.rankBtn}>
            Rank # {coin.market_cap_rank ?? "N/A"}
          </span>
        </div>

        <div className={styles.info}>
          <div className={styles.coinHeading}>
            {coin.image ? (
              <div className={styles.img}>
                <LazyLoadImage
                  alt={coin.symbol?.toLowerCase() ?? ""}
                  effect="blur"
                  placeholderSrc={`${process.env.PUBLIC_URL}/logo192.png`}
                  src={coin.image.small}
                />
              </div>
            ) : null}
            <p className={styles.infoParagraph}>{coin.name}</p>
            {coin.symbol ? (
              <p className={styles.infoParagraph}>
                {coin.symbol.toUpperCase()}/USD
              </p>
            ) : null}
          </div>

          <div className={styles.coinPrice}>
            {coin.market_data?.current_price ? (
              <h2 className={styles.heading}>
                ${coin.market_data.current_price.usd.toLocaleString()}
              </h2>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.tableRow}>
              <th className={styles.thTd}>1h</th>
              <th className={styles.thTd}>24h</th>
              <th className={styles.thTd}>7d</th>
              <th className={styles.thTd}>14d</th>
              <th className={styles.thTd}>30d</th>
              <th className={styles.thTd}>1yr</th>
            </tr>
          </thead>

          <tbody>
            <CoinTable coin={coin} />
          </tbody>
        </table>
      </div>

      <div className={styles.content}>
        <div className={styles.stats}>
          <div className="left">
            <div className={styles.row}>
              <h4>24 Hour Low</h4>
              {coin.market_data?.low_24h ? (
                <p className={styles.statsRowParagraph}>
                  ${coin.market_data.low_24h.usd.toLocaleString()}
                </p>
              ) : null}
            </div>

            <div className={styles.row}>
              <h4>24 Hour High</h4>
              {coin.market_data?.high_24h ? (
                <p className={styles.statsRowParagraph}>
                  ${coin.market_data.high_24h.usd.toLocaleString()}
                </p>
              ) : null}
            </div>
          </div>

          <div className="right">
            <div className={styles.row}>
              <h4>Market Cap</h4>
              {coin.market_data?.market_cap ? (
                <p className={styles.statsRowParagraph}>
                  ${coin.market_data.market_cap.usd.toLocaleString()}
                </p>
              ) : null}
            </div>

            <div className={styles.row}>
              <h4>Circulating Supply</h4>
              {coin.market_data ? (
                <p className={styles.statsRowParagraph}>
                  {coin.market_data.circulating_supply?.toLocaleString() ??
                    "N/A"}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className="about">
          <h3 className={styles.heading}>About</h3>
          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(coin.description?.en ?? ""),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Coin;
