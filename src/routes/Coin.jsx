import axios from "axios";
import DOMPurify from "dompurify";

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../styles/Coin.css";

const styles = {
  h3: "my-4 mx-0",
  content:
    "bg-zinc-800 rounded-lg flex flex-col	my-4 mx-auto max-w-3xl py-3 px-1 shadow-2xl	shadow-zinc-900	",
  info: "grid grid-cols-2",
  coinHeading: "items-center flex my-4 mx-0",
  coinPrice: "items-center flex justify-center",
  infoParagrah: "pr-4",
  rank: "my-2 mx-0",
  rankBtn:
    "bg-violet-700 border-2	border-violet-700 border-solid	rounded-lg	shadow-md	shadow-violet-700 p-1",
  stats: "grid gap-8	grid grid-cols-2 w-full",
  row: "flex justify-between my-2 mx-0 pb-2 border-b-2	border-solid	border-gray-50",
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
  }, []);

  return (
    <div>
      <div className="coin-container">
        <div className={styles.content}>
          <h1>{coin.name}</h1>
        </div>
        <div className={styles.content}>
          <div className={styles.rank}>
            <span className={styles.rankBtn}>
              Rank # {coin.market_cap_rank}
            </span>
          </div>
          <div className={styles.info}>
            <div className={styles.coinHeading}>
              {coin.image ? <img src={coin.image.small} alt="" /> : null}
              <p className={styles.infoParagrah}>{coin.name}</p>
              {coin.symbol ? (
                <p className={styles.infoParagrah}>
                  {coin.symbol.toUpperCase()}/USD
                </p>
              ) : null}
            </div>
            <div className={styles.coinPrice}>
              {coin.market_data?.current_price ? (
                <h1>${coin.market_data.current_price.usd.toLocaleString()}</h1>
              ) : null}
            </div>
          </div>
        </div>

        <div className={styles.content}>
          <table>
            <thead>
              <tr>
                <th>1h</th>
                <th>24h</th>
                <th>7d</th>
                <th>14d</th>
                <th>30d</th>
                <th>1yr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {coin.market_data?.price_change_percentage_1h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_24h_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_7d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_14d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_30d_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
                <td>
                  {coin.market_data?.price_change_percentage_24h_in_currency ? (
                    <p>
                      {coin.market_data.price_change_percentage_1y_in_currency.usd.toFixed(
                        1
                      )}
                      %
                    </p>
                  ) : null}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.content}>
          <div className={styles.stats}>
            <div className="left">
              <div className={styles.row}>
                <h4>24 Hour Low</h4>
                {coin.market_data?.low_24h ? (
                  <p>${coin.market_data.low_24h.usd.toLocaleString()}</p>
                ) : null}
              </div>
              <div className={styles.row}>
                <h4>24 Hour High</h4>
                {coin.market_data?.high_24h ? (
                  <p>${coin.market_data.high_24h.usd.toLocaleString()}</p>
                ) : null}{" "}
              </div>
            </div>
            <div className="right">
              <div className={styles.row}>
                <h4>Market Cap</h4>
                {coin.market_data?.market_cap ? (
                  <p>${coin.market_data.market_cap.usd.toLocaleString()}</p>
                ) : null}
              </div>
              <div className={styles.row}>
                <h4>Circulating Supply</h4>
                {coin.market_data ? (
                  <p>{coin.market_data.circulating_supply}</p>
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
    </div>
  );
};

export default Coin;
