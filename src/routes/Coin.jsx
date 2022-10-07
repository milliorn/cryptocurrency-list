import axios from "axios";
import DOMPurify from "dompurify";
import "react-lazy-load-image-component/src/effects/blur.css";

import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useParams } from "react-router-dom";

import CoinTable from "../components/CoinTable";

const styles = {
  coinHeading: "items-center flex my-4 mx-0",
  coinPrice: "items-center flex justify-center",
  content:
    "bg-zinc-800 rounded-lg flex flex-col	my-4 mx-auto max-w-3xl py-3 px-1 shadow-2xl	shadow-zinc-900	",
  h3: "my-4 mx-0",
  img: "h-12	mr-2",
  info: "grid grid-cols-2",
  infoParagrah: "pr-4",
  rank: "my-2 mx-0",
  rankBtn:
    "bg-slate-600 border-2	border-slate-600 border-solid	rounded-lg	shadow-md	shadow-slate-600 p-1",
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

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;

  useEffect(() => {
    axios
      .get(url)
      .then((res) => {
        setCoin(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="coin-container">
      <div className={styles.content}>
        <div className={styles.rank}>
          <span className={styles.rankBtn}>Rank # {coin.market_cap_rank}</span>
        </div>

        <div className={styles.info}>
          <div className={styles.coinHeading}>
            {coin.image ? (
              <div className={styles.img}>
                <LazyLoadImage
                  alt={coin.symbol.toLowerCase()}
                  effect="blur"
                  height={coin.image.height}
                  placeholderSrc="../../public/logo192.png"
                  src={coin.image.small}
                  width={coin.image.width}
                />
              </div>
            ) : null}
            <p className={styles.infoParagrah}>{coin.name}</p>
            {coin.symbol ? (
              <p className={styles.infoParagrah}>
                {coin.symbol.toUpperCase()}/USD
              </p>
            ) : null}
          </div>

          <div className={styles.coinPrice}>
            {coin.market_data?.current_price ? (
              <h2 className={styles.h2}>
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
              ) : null}{" "}
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
                  ${coin.market_data.circulating_supply.toLocaleString()}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className="about">
          <h3 className={styles.h3}>About</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                coin.description ? coin.description.en : ""
              ),
            }}
          ></p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
